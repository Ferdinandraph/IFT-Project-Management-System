const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  leadSupervisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor', required: true },
  additionalSupervisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Group', groupSchema);
