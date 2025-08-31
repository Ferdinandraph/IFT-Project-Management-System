const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Project = require('../models/Project');

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