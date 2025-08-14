const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
  residence_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Residence', required: true },
  category: { type: String, enum: ['FINANCIAL','MAINTENANCE','SOCIAL'], required: true },
  message: String,
  status: { type: String, enum: ['NEW','RESOLVED'], default: 'NEW' },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', AlertSchema);
