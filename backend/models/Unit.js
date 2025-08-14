const mongoose = require('mongoose');

const UnitSchema = new mongoose.Schema({
  building_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Building', required: true },
  owner_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  unit_number: { type: String, required: true },
  ownership_share: Number
});

module.exports = mongoose.model('Unit', UnitSchema);
