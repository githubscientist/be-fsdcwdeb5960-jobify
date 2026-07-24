// import express
const express = require('express');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const companyRouter = require('./routes/companyRouter');
const jobRouter = require('./routes/jobRouter');
const applicationRouter = require('./routes/applicationRouter');

// create express app
const app = express();

// enable static files for uploads
app.use('/uploads', express.static('uploads'));

// parse cookies
app.use(cookieParser());

// parse the request body as JSON
app.use(express.json());

// configure routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/companies', companyRouter);
app.use('/api/v1/jobs', jobRouter);
app.use('/api/v1/applications', applicationRouter);

// export the app
module.exports = app;