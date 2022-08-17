const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');

const connectDatabase = require('./config/db'); 

// Load ENV Config
dotenv.config({path: './config/config.env'});

// connect to database
connectDatabase();

// Initialize app
const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

// Body Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.disable('etag');

// handlebars
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//routes
app.use('/', require('./routes/index')); 



const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


