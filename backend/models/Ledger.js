const mongoose = require('mongoose');

const LedgerSchema = new mongoose.Schema({
  residence_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Residence', required: true },
  journal_entry: String,
  general_ledger_entry: String,
  inventory_entry: String,
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Ledger', LedgerSchema);
