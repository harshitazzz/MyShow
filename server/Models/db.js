// Models/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
if (!mongo_url) {
  console.error('MONGO_CONN is not set in .env');
  process.exit(1);
}
const dbAuth = mongoose.createConnection(mongo_url);

dbAuth.on('connected', () => {
    console.log("Connected to MongoDB (Auth DB)");
});

dbAuth.on('error', (err) => {
    console.log("Error connecting to MongoDB (Auth DB):", err);
});

module.exports = { dbAuth };