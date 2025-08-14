const mongoose = require('mongoose');

const LegalResourceSchema = new mongoose.Schema({
  residence_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Residence' },
  title: { type: String, required: true },
  description: String,
  file_path: String
});

module.exports = mongoose.model('LegalResource', LegalResourceSchema);
