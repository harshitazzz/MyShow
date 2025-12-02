// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const AuthRouter = require('./Routes/AuthRouter');
const AdminRouter = require('./Routes/AdminRouter');
const MovieRouter = require('./Routes/MovieRouter');
const TheatreRouter = require('./Routes/TheatreRouter');

// ensure DB connection file registers connection
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// health / default route
app.get('/', (req, res) => res.send('Welcome to the Auth + Admin + Movies API'));

// routers
app.use('/auth', AuthRouter);   // user auth (signup/login)
app.use('/admin', AdminRouter); // admin auth + admin-only movie routes
app.use('/movies', MovieRouter); // public movies endpoint (users/frontend)
app.use('/theatres', TheatreRouter); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));