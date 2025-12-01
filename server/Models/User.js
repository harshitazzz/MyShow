// Models/User.js
const mongoose = require('mongoose');
const { dbAuth } = require('./db');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const UserModel = dbAuth.model("User", UserSchema);
module.exports = UserModel;