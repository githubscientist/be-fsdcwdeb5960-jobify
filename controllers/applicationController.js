const Job = require('../models/job');
const Application = require('../models/application');

const applicationController = {
    applyForJob: async (req, res) => {
        try {
            // get the jobId from the params
            const { jobId } = req.params;

            // get the userId from the req.userId
            const userId = req.userId;

            // get the coverLetter from the req.body
            const { coverLetter } = req.body;

            // get the job from the database using the jobId
            // check if job exists and is active
            const job = await Job.findOne({ _id: jobId, isActive: true});

            // if not, return 404
            if (!job) {
                return res.status(404).json({ message: 'Job not found or is not active' });
            }

            // check if user has already applied for the job
            const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

            // if yes, return 400
            if (existingApplication) {
                return res.status(400).json({ message: 'You have already applied for this job' });
            }

            // check if application deadline has passed
            // if yes, return 400
            if (job.applicationDeadline && new Date() > job.applicationDeadline) {
                return res.status(400).json({ message: 'The application deadline for this job has passed' });
            }

            // create the application
            const newApplication = new Application({
                job: jobId,
                applicant: userId,
                coverLetter: coverLetter || '',
            });

            // save the application to the database
            await newApplication.save();

            // update the job's applications count
            await Job.findByIdAndUpdate(jobId, { $inc: { applicationCount: 1 } });

            // send an email notification to the employer about the new application

            // return success response
            return res.status(201).json({ message: 'Application submitted successfully', application: newApplication });
        } catch (e) {
            return res.status(500).json({ message: 'Failed to apply for the job', error: e.message });
        }
    },
    getUserApplications: async (req, res) => {
        try {
            const userId = req.userId;

            const applications = await Application.find({ applicant: userId }).populate({
                path: 'job',
                populate: 'company',
                select: 'title description location jobType experienceLevel company',
                populate: {
                    path: 'company',
                    select: 'name logo'
                }
            })
                .sort({ createdAt: -1 });

            res.status(200).json({ applications });
        } catch (e) {
            return res.status(500).json({ message: 'Failed to get user applications', error: e.message });
        }
    },
    updateApplicationStatus: async (req, res) => {
        try {
            const { applicationId } = req.params;
            const { notes, status } = req.body;

            const userId = req.userId;

            // find the application by ID
            const application = await Application
                .findById(applicationId)
                .populate({
                    path: 'job',
                    populate: {
                        path: 'postedBy',
                    }
                })
                .populate('applicant', 'name email');
            
            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
            }

            // check if the logged in user is the employer who posted the job
            if (application.job.postedBy._id.toString() !== userId) {
                return res.status(403).json({ message: 'You are not authorized to update this application' });
            }

            // update the application status and notes
            application.status = status || application.status;
            application.notes = notes || application.notes;
            application.reviewedBy = userId;
            application.reviewedAt = new Date();

            await application.save();

            // send an email notification to the applicant about the status update

            // return success response
            return res.status(200).json({ message: 'Application status updated successfully', application });
        } catch (e) {
            return res.status(500).json({ message: 'Failed to update application status', error: e.message });
        }
    },
    getApplicationById: async (req, res) => {
        try {
            const { applicationId } = req.params;

            const userId = req.userId;

            const application = await Application.findById(applicationId)
                .populate({
                    path: 'job',
                    populate: {
                        path: 'company',
                        select: 'name logo'
                    }
                })
                .populate('reviewedBy', 'name');
            if (!application) {
                return res.status(404).json({ message: 'Application not found' });
            }

            // check if the logged in user is either the applicant or the employer who posted the job
            if (application.applicant.toString() !== userId && application.job.postedBy.toString() !== userId) {
                return res.status(403).json({ message: 'You are not authorized to view this application' });
            }

            res.status(200).json({ application });
        } catch (e) {
            return res.status(500).json({ message: 'Failed to get application by ID', error: e.message });
        }
    }
}

module.exports = applicationController;