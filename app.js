require('dotenv').config();
require('./database/mongodb');
const express = require('express');
const postRoutes = require('./routes/postRoutes');

const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use(postRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})