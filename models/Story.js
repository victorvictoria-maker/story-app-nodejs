const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
   title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
        // type: String,
        // default: '62fcd4308bf03d5179aac30d'
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Story', StorySchema);