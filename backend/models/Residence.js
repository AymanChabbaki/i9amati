const mongoose = require('mongoose');

const ResidenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: String
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Residence', ResidenceSchema);
