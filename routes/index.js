const express = require('express');
const router = express.Router();

// Login/Landing page
// route GET /
router.get('/', (req, res) => {
    // res.send('Hello, you are logged in to the landing page');
    res.render('login', {
        layout: 'login'
    });
});

// Dashboard
// route GET /dashboard
router.get('/dashboard', (req, res) => {
    // res.send('Hello, you are logged in to the dashboard');
    res.render('dashboard');
});


module.exports = router;