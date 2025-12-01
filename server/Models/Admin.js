const mongoose = require('mongoose');
const { dbAuth } = require('./db');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

const AdminModel = dbAuth.model('Admin', AdminSchema);
module.exports = AdminModel;