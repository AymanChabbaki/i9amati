const mongoose = require('mongoose');

const FinancialSchema = new mongoose.Schema({
  unit_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  type: { type: String, enum: ['CONTRIBUTION','PAYMENT','EXPENSE'], required: true },
  amount: { type: Number, required: true },
  due_date: Date,
  paid_at: Date,
  status: { type: String, enum: ['PENDING','PAID','OVERDUE'], default: 'PENDING' }
});

module.exports = mongoose.model('Financial', FinancialSchema);
