const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Login/Landing page
// route GET /
router.get('/', ensureGuest, (req, res) => {
    // res.send('Hello, you are logged in to the landing page');
    res.render('login', {
        layout: 'login'
    });
});

// Dashboard
// route GET /dashboard
router.get('/dashboard', ensureAuth, (req, res) => {
    // res.send('Hello, you are logged in to the dashboard');
    res.render('dashboard');
});


module.exports = router;