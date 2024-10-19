const mongoose = require('mongoose');
const colors = require('colors');

const connectDB  = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to database ${mongoose.connection.host}`.bgCyan)
    } catch (error) {
        console.log('DB error',error)
    }
}

module.exports = connectDB;