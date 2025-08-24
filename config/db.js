const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to MongoDb Database ${conn.connection.host}`.bgGreen.white);
    } catch (error) {
        console.log(`Error in MongoDb Database Connection${error}`.bgRed.white);
    }
}

module.exports = connectDB;