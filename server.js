// setup mongodb database connection
// import mongoose
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./utils/config');

// connect to mongodb database
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    })