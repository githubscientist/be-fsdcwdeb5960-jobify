// setup mongodb database connection
// import mongoose
const mongoose = require('mongoose');
const { MONGODB_URI, PORT, HOST } = require('./utils/config');
const app = require('./app');

// connect to mongodb database
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // start the server after successful database connection
        app
            .listen(PORT, HOST, () => {
                console.log(`Server running on http://${HOST}:${PORT}`);
            })
            .on('error', (error) => {
                console.error('Error starting the server:', error.message);
            })
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    })