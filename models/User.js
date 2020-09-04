const mongoose = require('mongoose');
const { isEmail } = require('validator'); 
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    email: { 
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    role: {
        type: String,
        required: true, 
        default: 'user',
        enum: ['admin', 'user']
    }
});

// Generate salt and hash password before User is saved
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Static function to login user 
userSchema.statics.login = async (email, password) => {
    // Find user email
    const user = await User.findOne({ email });

    // If user exists
    if (user) {
        // Compare the entered password against the hashed password
        const auth = await bcrypt.compare(password, user.password); 
        // If password is correct
        if (auth) {
            // Return user
            return user;
        }
        // If password is not correct, throw error
        throw Error('Incorrect password');
    }
    // If user doesn't exist, throw error 
    throw Error('Incorrect email')
        
    
}

// Create a User model based on the userSchema
const User = mongoose.model('User', userSchema);

// Export User
module.exports = User;