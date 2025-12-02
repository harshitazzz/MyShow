// Models/db.js
require('dotenv').config();
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
if (!mongo_url) {
  console.error('MONGO_CONN is not set in .env');
  process.exit(1);
}

mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Error connecting to MongoDB:", err));

module.exports = mongoose;