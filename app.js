require('dotenv').config();
require('./database/mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, isAdmin } = require('./middlewares/authMiddleware');

const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(requireAuth, commentRoutes);
app.use( postRoutes);
app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});
