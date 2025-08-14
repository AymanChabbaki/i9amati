const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  unit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit' },
  vote: { type: String, enum: ['YES','NO','ABSTAIN'], required: true },
  shares: Number
});

const MeetingSchema = new mongoose.Schema({
  residence_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Residence', required: true },
  type: { type: String, enum: ['ORDINARY','EXTRAORDINARY','FOUNDING'], required: true },
  agenda: String,
  scheduled_at: Date,
  status: { type: String, enum: ['PLANNED','COMPLETED'], default: 'PLANNED' },
  votes: [VoteSchema]
});

module.exports = mongoose.model('Meeting', MeetingSchema);
