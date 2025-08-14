const mongoose = require('mongoose');

const UnionAgentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assigned_residences: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Residence' }]
});

module.exports = mongoose.model('UnionAgent', UnionAgentSchema);
