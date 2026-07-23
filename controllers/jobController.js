const Job = require('../models/job');
const Application = require('../models/application');

const jobController = {
    getAllJobs: async (request, response) => {
        try {
            // get page, limit, search, location, jobType, experienceLevel from request.query
            const { page = 1, limit = 10, search, location, jobType, experienceLevel }  = request.query;
            
            // prepare the query object
            const query = {
                isActive: true,
            };

            // if search is provided, add it to the query object
            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } },
                    { skills: { $in: [new RegExp(search, 'i')] } }
                ]
            }

            // if location is provided, add it to the query object
            if (location) {
                query.location = { $regex: location, $options: 'i' };
            }

            // if jobType is provided, add it to the query object
            if(jobType) {
                query.jobType = jobType;
            }

            // if experienceLevel is provided, add it to the query object
            if(experienceLevel) {
                query.experienceLevel = experienceLevel;
            }

            // get jobs from database using the query object and pagination
            const jobs = await Job.find(query)
                .populate('company', 'name logo location industry')
                .populate('postedBy', 'name')
                .sort({ createdAt: -1 })
                .limit(limit * 1)
                .skip((page - 1) * limit);

            // get the total count of jobs from database
            const total = await Job.countDocuments(query);

            // return a response with the jobs, totalPages, currentPage, and totalJobs
            return response.status(200).json({
                jobs,
                totalPages: Math.ceil(total / limit),
                currentPage: page,
                totalJobs: total,
            });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    getJobById: async (request, response) => {
        try {
            const { id } = request.params;

            const job = await Job.findById(id)
                .populate('company', 'name logo location industry website description')
                .populate('postedBy', 'name');
            
            if (!job) {
                return response.status(404).json({ message: 'Job not found' });
            }

            return response.status(200).json({ job });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    createJob: async (request, response) => {
        try {
            const { title, description, requirements, salary, location, jobType, experienceLevel, skills, applicationDeadline } = request.body;

            const newJob = new Job({
                title,
                description,
                requirements: requirements || [],
                salary,
                location,
                jobType,
                experienceLevel,
                skills: skills || [],
                applicationDeadline,
                postedBy: request.userId,
                company: request.user.assignedCompany
            });

            const savedJob = await newJob.save();

            const populatedJob = await Job.findById(savedJob._id)
                .populate('company', 'name logo location industry')
                .populate('postedBy', 'name');
            
            return response.status(201).json({ job: populatedJob });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    updateJob: async (request, response) => {
        try {
            const { id } = request.params;

            const updates = request.body;

            const updatedJob = await Job.findByIdAndUpdate(id, updates, { new: true })
                .populate('company', 'name logo location industry')
                .populate('postedBy', 'name');
            
            if (!updatedJob) {
                return response.status(404).json({ message: 'Job not found' });
            }
            
            return response.status(200).json({ job: updatedJob });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    deleteJob: async (request, response) => {
        try {
            const { id } = request.params;

            const deletedJob = await Job.findByIdAndDelete(id);

            if (!deletedJob) {
                return response.status(404).json({ message: 'Job not found' });
            }

            return response.status(200).json({ message: 'Job deleted successfully' });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    getRecruiterJobs: async (request, response) => {
        try {
            const jobs = await Job.find({ postedBy: request.userId })
                .populate('company', 'name logo location industry')
                .populate('postedBy', 'name')
                .sort({ createdAt: -1 });

            return response.status(200).json({ jobs });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
    getJobApplications: async (request, response) => {
        try {
            const { id } = request.params;

            const job = await Job.findOne({ _id: id, postedBy: request.userId });

            if (!job) {
                return response.status(404).json({ message: 'Job not found or you are not authorized to view applications for this job' });
            }
            
            const applications = await Application.find({ job: id })
                .populate('applicant', 'name email phone resume profilePicture bio skills experience location')
                .populate('job', 'title')
                .sort({ appliedAt: -1 });
            
            return response.status(200).json({ applications });
        } catch (e) {
            return response.status(500).json({ message: e.message });
        }
    },
}

module.exports = jobController;