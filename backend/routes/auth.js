const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Supervisor = require('../models/Supervisor');
const Student = require('../models/Student');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check Admin
    if (username === process.env.ADMIN_USERNAME) {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(400).json({ message: 'Admin not found' });
      }
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, role: admin.role });
    }

    // Check Supervisor
    let user = await Supervisor.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, role: user.role });
    }

    // Check Student (matricNumber as username and password)
    user = await Student.findOne({ matricNumber: username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, role: user.role });
    }

    res.status(400).json({ message: 'Invalid credentials' });
  } catch (error) {
    // Log full error server-side and return a minimal message to the client
    console.error('Auth /login error:', error?.stack || error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;