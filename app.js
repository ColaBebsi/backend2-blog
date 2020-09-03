require('dotenv').config();
require('./database/mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');

const PORT = process.env.PORT;
const app = express();

// Middlewares
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(postRoutes);
app.use(commentRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})