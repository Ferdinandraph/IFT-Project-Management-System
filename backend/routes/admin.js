const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const fs = require('fs');
const { parse } = require('csv-parse');
const authMiddleware = require('../middleware/authMiddleware');
const Supervisor = require('../models/Supervisor');
const Student = require('../models/Student');
const Project = require('../models/Project');
const Group = require('../models/Group');

// Configure Multer for CSV uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(new Error('Only CSV files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Add Supervisor
router.post('/supervisor', authMiddleware(['admin']), async (req, res) => {
  const { name, username, email, password, department, field } = req.body;
  try {
    const existingSupervisor = await Supervisor.findOne({ $or: [{ username }, { email }] });
    if (existingSupervisor) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    const supervisor = new Supervisor({
      name,
      username,
      email,
      password: await bcrypt.hash(password, 10),
      department,
      field,
    });
    await supervisor.save();
    res.status(201).json({ message: 'Supervisor added successfully', supervisor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all supervisors
router.get('/supervisors', authMiddleware(['admin']), async (req, res) => {
  try {
    const supervisors = await Supervisor.find().select('-password');
    res.json(supervisors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Edit Supervisor
router.put('/supervisor/:id', authMiddleware(['admin']), async (req, res) => {
  const { name, username, email, password, department, field } = req.body;
  try {
    const supervisor = await Supervisor.findById(req.params.id);
    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }
    const existingSupervisor = await Supervisor.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: req.params.id },
    });
    if (existingSupervisor) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    supervisor.name = name || supervisor.name;
    supervisor.username = username || supervisor.username;
    supervisor.email = email || supervisor.email;
    if (password) supervisor.password = await bcrypt.hash(password, 10);
    supervisor.department = department || supervisor.department;
    supervisor.field = field || supervisor.field;
    await supervisor.save();
    res.json({ message: 'Supervisor updated successfully', supervisor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Remove Supervisor
router.delete('/supervisor/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const supervisor = await Supervisor.findByIdAndDelete(req.params.id);
    if (!supervisor) {
      return res.status(404).json({ message: 'Supervisor not found' });
    }
    // Unassign supervisor from students
    await Student.updateMany({ supervisorId: req.params.id }, { $unset: { supervisorId: '' } });
    res.json({ message: 'Supervisor removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add Student
router.post('/student', authMiddleware(['admin']), async (req, res) => {
  const { name, matricNumber } = req.body;
  try {
    const existingStudent = await Student.findOne({ matricNumber });
    if (existingStudent) {
      return res.status(400).json({ message: 'Matric number already exists' });
    }
    const student = new Student({
      name,
      matricNumber,
    });
    await student.save();
    res.status(201).json({ message: 'Student added successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all students
router.get('/students', authMiddleware(['admin']), async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Edit Student
router.put('/student/:id', authMiddleware(['admin']), async (req, res) => {
  const { name, matricNumber } = req.body;
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    const existingStudent = await Student.findOne({
      matricNumber,
      _id: { $ne: req.params.id },
    });
    if (existingStudent) {
      return res.status(400).json({ message: 'Matric number already exists' });
    }
    student.name = name || student.name;
    student.matricNumber = matricNumber || student.matricNumber;
    await student.save();
    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Remove Student
router.delete('/student/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    // Remove associated projects
    await Project.deleteMany({ studentId: req.params.id });
    res.json({ message: 'Student removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Assign supervisor to student
router.put('/assign-supervisor', authMiddleware(['admin']), async (req, res) => {
  const { studentId, supervisorId } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(studentId, { supervisorId }, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Supervisor assigned successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Add students via CSV
router.post('/students/csv', authMiddleware(['admin']), upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const students = [];
  fs.createReadStream(req.file.path)
    .pipe(parse({ columns: true, trim: true }))
    .on('data', (row) => {
      if (row.name && row.matricNumber) {
        students.push({
          name: row.name,
          matricNumber: row.matricNumber,
        });
      }
    })
    .on('end', async () => {
      try {
        const addedStudents = [];
        const errors = [];

        for (const studentData of students) {
          const { name, matricNumber } = studentData;
          const existingStudent = await Student.findOne({ matricNumber });
          if (existingStudent) {
            errors.push(`Student with matric number ${matricNumber} already exists`);
            continue;
          }
          const student = new Student({
            name,
            matricNumber,
          });
          await student.save();
          addedStudents.push(student);
        }

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.status(201).json({
          message: 'CSV processed',
          addedStudents,
          errors: errors.length > 0 ? errors : undefined,
        });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    })
    .on('error', (error) => {
      res.status(500).json({ message: 'Error parsing CSV', error });
    });
});

module.exports = router;

// Groups endpoints
// Create group (admin)
router.post('/groups', authMiddleware(['admin']), async (req, res) => {
  const { groupName, leadSupervisor, additionalSupervisors } = req.body;
  try {
    const group = new Group({ groupName, leadSupervisor, additionalSupervisors });
    await group.save();
    res.status(201).json({ message: 'Group created', group });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get all groups (admin)
router.get('/groups', authMiddleware(['admin']), async (req, res) => {
  try {
    const groups = await Group.find().populate('leadSupervisor', '-password').populate('additionalSupervisors', '-password');
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update group (admin)
router.put('/groups/:id', authMiddleware(['admin']), async (req, res) => {
  const { groupName, leadSupervisor, additionalSupervisors } = req.body;
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    group.groupName = groupName || group.groupName;
    group.leadSupervisor = leadSupervisor || group.leadSupervisor;
    group.additionalSupervisors = additionalSupervisors || group.additionalSupervisors;
    await group.save();
    const populated = await Group.findById(group._id).populate('leadSupervisor', '-password').populate('additionalSupervisors', '-password');
    res.json({ message: 'Group updated', group: populated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete group (admin)
router.delete('/groups/:id', authMiddleware(['admin']), async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json({ message: 'Group deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

