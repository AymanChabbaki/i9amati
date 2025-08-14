const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  password_hash: { type: String, required: true },
  role_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  status: { type: String, enum: ['ACTIVE','INACTIVE'], default: 'ACTIVE' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
