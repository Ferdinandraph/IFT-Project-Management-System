const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');

// Configure Multer for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Upload project
router.post('/project', authMiddleware(['student']), upload.single('file'), async (req, res) => {
  const { title, description } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const project = new Project({
      studentId: req.user.id,
      supervisorId: (await Student.findById(req.user.id)).supervisorId,
      title,
      description,
      fileUrl: req.file.path,
    });
    await project.save();
    res.status(201).json({ message: 'Project uploaded successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;