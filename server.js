const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute')
const cors = require('cors');

//CONFIG DOTENV
dotenv.config();

//DATABASE CONFIGURATION
connectDB();

// REST OBJECT
const app = express(); 

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//ROUTES
app.use('/api/v1/auth', authRoutes);

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