const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  matricNumber: { type: String, required: true, unique: true },
  supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor' },
  role: { type: String, default: 'student' },
});

module.exports = mongoose.model('Student', studentSchema);