const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminModel = require('../Models/Admin');

const adminSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await AdminModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Admin already exists', success: false });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = await AdminModel.create({ username, email, password: hashed });

    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ message: 'Admin created', success: true, token, admin: { id: newAdmin._id, username: newAdmin.username, email: newAdmin.email } });
  } catch (err) {
    console.error('Admin signup error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (!admin) return res.status(403).json({ message: 'Authentication Failed', success: false });

    const ok = await bcrypt.compare(password, admin.password);
    if (!ok) return res.status(403).json({ message: 'Authentication Failed', success: false });

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ message: 'Login successful', success: true, token, admin: { id: admin._id, username: admin.username, email: admin.email } });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Internal Server Error', success: false });
  }
};

module.exports = { adminSignup, adminLogin };