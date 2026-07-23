const express = require('express');
const { isAuthenticated, allowRoles } = require('../middlewares/auth');
const { applyForJob, getUserApplications, updateApplicationStatus, getApplicationById } = require('../controllers/applicationController');

const applicationRouter = express.Router();

applicationRouter.use(isAuthenticated);

// user routes
// to apply for the job
applicationRouter.post('/:jobId/apply', allowRoles(['user']), applyForJob);

// get the user applications
applicationRouter.get('/', allowRoles(['user']), getUserApplications);

// recruiter routes
// updates the application status
applicationRouter.put('/:applicationId/status', allowRoles(['recruiter']), updateApplicationStatus);

// shared routes
// get the application by ID
applicationRouter.get('/:applicationId', allowRoles(['user', 'recruiter']), getApplicationById);

module.exports = applicationRouter;