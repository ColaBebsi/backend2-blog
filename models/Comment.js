const mongoose = require('mongoose');

let commentSchema = new mongoose.Schema({
    content: String,
    postId: String,
});

module.exports = mongoose.model('Comment', commentSchema);