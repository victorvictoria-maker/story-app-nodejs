const express = require('express');
const router = express.Router();
const { ensureAuth} = require('../middleware/auth');

// Bring in the story model
const Story = require('../models/Story');

// Show add page
// route GET /stories/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
});

// Show process add form
// route POST /stories
router.post('/', ensureAuth, async (req, res) => {
   try {
        req.body.user = req.body.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
   } catch (err) {
    console.error(err);
    res.render('errors/500');
   }
});

module.exports = router;