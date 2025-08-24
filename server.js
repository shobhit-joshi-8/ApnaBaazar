const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');

//CONFIG DOTENV
dotenv.config();

// REST OBJECT
const app = express(); 

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