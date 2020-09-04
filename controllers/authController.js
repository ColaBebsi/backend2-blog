const User = require('../models/User');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60; // 3 days in milliseconds

function handleErrors(error) {  
    // Put the errors messages inside this variable
    let errors = { email: '', password: '', role: '' };

    // If email is incorrect
    if (error.message === 'Incorrect email') {
        errors.email = 'Email is not registered';
    }

    // If password is incorrect 
    if (error.message === 'Incorrect password') {
        errors.password = 'Password is incorrect';
    }

    // If there is duplicate
    if (error.code === 11000) {
        errors.email = 'Email is already taken';
        return errors;
    }

    // If the error message is 'User validation failed'
    if (error.message.includes('User validation failed')) {
         // Get values of this errors object
         // Loop through each error to get the properties
        Object.values(error.errors).forEach(({ properties }) => {
            // Set the error message to errors properties(email, password)
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

function createToken(payload) {
    return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: maxAge });
}

const signup = async (req, res) => {
    const { email, password, role } = req.body;
    
    try {
        const user = await User.create({ email, password, role });
        res.status(201).json({ message: 'Signed up successfully', user: user });
    } catch (error) {
        console.log(error.message)
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        
        res.status(200).json({ message: 'Logged in successfully', user: user._id, token: token });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
}

module.exports = { signup, login };
