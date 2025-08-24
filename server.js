const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

//CONFIG DOTENV
dotenv.config();

//DATABASE CONFIGURATION
connectDB();

// REST OBJECT
const app = express(); 

//MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));

// REST API
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to ApnaBazaar"
    })
})

//PORT
const PORT = process.env.PORT || 8080;

//RUN LISTEN
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`.bgCyan.white)
})