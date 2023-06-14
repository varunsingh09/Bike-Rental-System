const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const  bodyParser = require('body-parser');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');
dotenv.config({ path: './config.env' });

require('./database/conn'); 
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(require('./router/auth'));
app.use("/uploads",express.static('uploads'));


const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
})