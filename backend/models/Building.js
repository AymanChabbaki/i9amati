const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
  residence_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Residence', required: true },
  name: { type: String, required: true },
  description: String
});

module.exports = mongoose.model('Building', BuildingSchema);
