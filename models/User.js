const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        isAdmin: false
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

module.exports = mongoose.model('User', userSchema);