const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');
const Student = require('../models/Student');
const Group = require('../models/Group');
const Supervisor = require('../models/Supervisor');

// Supervisor dashboard
router.get('/dashboard', authMiddleware(['supervisor']), async (req, res) => {
  try {
    const supervisorId = req.user.id;

    // Groups where supervisor is lead or co-supervisor
    const groups = await Group.find({ $or: [ { leadSupervisor: supervisorId }, { additionalSupervisors: supervisorId } ] })
      .populate('leadSupervisor', '-password')
      .populate('additionalSupervisors', '-password');

    // Students assigned to this supervisor
    const students = await Student.find({ supervisorId: supervisorId });

    // Projects for those students
    const studentIds = students.map(s => s._id);
    const projects = await Project.find({ studentId: { $in: studentIds } }).populate('studentId', 'name matricNumber').populate('supervisorId', 'name username email');

    // Group projects by student and chapter
    const projectsByStudent = {};
    projects.forEach(p => {
      const sid = p.studentId._id.toString();
      if (!projectsByStudent[sid]) projectsByStudent[sid] = [];
      projectsByStudent[sid].push(p);
    });

  // also include supervisor profile (without password)
  const supervisorProfile = await Supervisor.findById(supervisorId).select('-password');
  res.json({ supervisor: supervisorProfile, groups, students, projectsByStudent });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Review and provide feedback
router.put('/project/:id/feedback', authMiddleware(['supervisor']), async (req, res) => {
  const { feedback, status } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { feedback, status, updatedAt: Date.now() },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Feedback updated', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;