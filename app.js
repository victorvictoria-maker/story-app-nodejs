const express = require('express');
const dotenv = require('dotenv');
const connectDatabase = require('./config/db'); 
// const morgan = require('morgan');

// Load ENV Config
dotenv.config({path: './config/config.env'});

// connect to database
connectDatabase();

const app = express();
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// };

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );


