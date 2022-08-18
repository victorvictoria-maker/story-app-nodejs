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
        let index = user.findIndex(x => x._id == req.user.id);
        const thisUser = user[index];
        const thisUserId = thisUser._id;
        const userId = thisUserId.toString();

        const stories = await Story.find({user: req.user.id}).lean();
        console.log(req.user.id);
        console.log(userId);
        console.log(stories);
        
        res.render('dashboard', {
            name: thisUser.lastName,
            stories
        });
    } catch (err) {
        console.error(err);
        res.render('error/500');
    };
});


module.exports = router;