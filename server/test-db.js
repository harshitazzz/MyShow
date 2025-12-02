require('dotenv').config();
const mongoose = require('mongoose');

const mongo_url = process.env.MONGO_CONN;
console.log("Testing connection to:", mongo_url.replace(/:([^@]+)@/, ':****@')); // Hide password

const db = mongoose.createConnection(mongo_url);

db.on('connected', () => {
    console.log("SUCCESS: Connected to MongoDB!");
    process.exit(0);
});

db.on('error', (err) => {
    console.error("FAILURE: Connection error:", err);
    process.exit(1);
});

// Timeout after 10s
setTimeout(() => {
    console.error("FAILURE: Connection timed out after 10s");
    process.exit(1);
}, 10000);
