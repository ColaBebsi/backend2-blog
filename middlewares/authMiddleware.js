const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = async (req, res, next) => {
    if (!req.headers.authorization) return res.sendStatus(401);

    try {
         // Check for authorization header 
        const token = req.headers.authorization.replace('Bearer ', '');
        // Verify token
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        // Save the decrypted payload in the request object
        req.payload = payload;
        
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
}

const isAdmin = async (req, res, next) => {
    // Get user id through the payload 
    const { payload } = req.payload;

    try {
        const user = await User.findById({ _id: payload });
        
        // Check if user role is an admin
        if (user.role !== 'admin') {
            res.send('Access denied') 
        }
        next();
    } catch (error) {
        console.error(error.message); 
        res.status(401).json('No user found');
    }
    
}

module.exports = { requireAuth, isAdmin };