const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// Bring in the story model
const User = require('../models/User');
const Story = require('../models/Story');

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
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const user = await User.find().lean();
        const stories = await Story.find({user: req.user.id}).lean();
        
        res.render('dashboard', {
            name: user[0].firstName,
            stories
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    };
});


module.exports = router;