require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose
    .connect(
        uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
    })
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log(err.reason);
    });