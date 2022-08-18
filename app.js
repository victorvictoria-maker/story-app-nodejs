const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const exphbs = require('express-handlebars');
const session = require('express-session');
// connect-mongo is used to store session in the database
const MongoStore = require('connect-mongo');

const connectDatabase = require('./config/db'); 

// Load ENV Config
dotenv.config({path: './config/config.env'});

// Load Passport Config
require('./config/passport')(passport);

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


// sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,

    // store: new MongoStore({mongooseConnection: mongoose.connection})
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL
    })
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// static folder
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', require('./routes/index')); 
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));


const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


