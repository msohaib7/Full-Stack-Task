const express = require("express");
const app = express();

const dotenv = require('dotenv')
const mongoose = require("mongoose");

const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const verify = require('./middleware/verifyToken');

dotenv.config();



mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true},
()=> console.log('connected db')

);

app.use(express.json());
app.use('/api/user',authRoute)
app.use('/api/profile',verify, profileRoute)


app.listen(3000,() =>console.log('Server Up and Running'));

