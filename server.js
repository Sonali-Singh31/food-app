// Import
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

dotenv.config();

// DB connection
connectDB();

// Rest Object
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// route
app.use('/api/v1/test',require('./routes/testRoutes.js'))
app.use('/api/v1/auth',require('./routes/authRoutes.js'))
app.use('/api/v1/user',require('./routes/userRoutes.js'))
app.use('/api/v1/restaurant',require('./routes/restaurantRoutes.js'))
app.use('/api/v1/category',require('./routes/categoryRoutes.js'))
app.use('/api/v1/food',require('./routes/foodRoutes.js'))




app.get('/',(req,res)=>{
    return res.status(200).send("<h1>Welcome to Food Server APP API based project </h1>")
})

// PORT
const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server has started on ${PORT}`.white.bgMagenta)
})