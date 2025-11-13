const express=require('express');
const cors= require('cors');
const app= express();
const bodyParser = require('body-parser');
const AuthRouter= require('./Routes/AuthRouter');

require('dotenv').config();
require('./Models/db');
const PORT= process.env.PORT || 8080;

app.use(cors())
app.use(express.json());
app.use('/auth',AuthRouter);




app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});