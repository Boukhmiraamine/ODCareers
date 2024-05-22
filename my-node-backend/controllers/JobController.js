const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const Application = require('../models/Application');
const { sendNotification } = require('../helpers/notificationHelper');
const Notification = require('../models/Notification');
const axios = require('axios');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const newJob = new Job({ ...req.body, isApproved: false });
        await newJob.save();
        res.status(201).json({ message: "Job created and pending approval", job: newJob });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all jobs with optional filtering by recruiter ID
exports.getAllJobs = async (req, res) => {
    try {
        const { recruiterId } = req.query;
        const query = { isApproved: true };
        if (recruiterId) {
            query.recruiter = recruiterId;
        }
        const jobs = await Job.find(query).populate('recruiter');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get job by ID
exports.getJobById = async (req, res) => {
    console.log("Fetching job by ID:", req.params.id);
    try {
        const job = await Job.findById(req.params.id).populate('recruiter');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        if (!job.isApproved) {
            return res.status(403).json({ message: 'Job not approved yet' });
        }
        res.status(200).json(job);
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update a job
exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        const result = await Job.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Match skills for a job and candidate
exports.matchSkills = async (req, res) => {
    const { jobId, candidateId } = req.params;
    const job = await Job.findById(jobId);
    const candidate = await Candidate.findById(candidateId);

    if (!job || !candidate) {
        return res.status(404).json({ message: "Job or candidate not found" });
    }

    const postData = {
        job_description: job.requiredSkills,
        candidate_description: candidate.description
    };

    try {
        const pythonAPI = 'http://localhost:5000/match';
        const response = await axios.post(pythonAPI, postData);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error calling Python API:', error.message);
        res.status(500).json({ message: "Failed to call Python API", error: error.message });
    }
};

// Get jobs with optional search and pagination
exports.getJobs = async (req, res) => {
    console.log("Searching jobs with query:", req.query);
    const { search, contractType, workMode, semanticSearch, recruiterId, page = 1, pageSize = 10 } = req.query;

    let query = {
        isApproved: true,
        ...(contractType && { contractType }),
        ...(workMode && { workMode }),
        ...(recruiterId && { recruiter: recruiterId }) // Filter by recruiterId if provided
    };

    try {
        let jobs;
        if (search && !semanticSearch) {
            query.$text = { $search: search };
            jobs = await Job.find(query)
                            .populate('recruiter')
                            .skip((page - 1) * pageSize)
                            .limit(Number(pageSize));
        } else if (search && semanticSearch) {
            const allJobs = await Job.find({ isApproved: true }).lean();
            const descriptions = allJobs.map(job => job.description);

            const response = await axios.post('http://localhost:5001/search', {
                query: search,
                job_descriptions: descriptions
            });

            if (response.status === 404) {
                return res.status(404).json({ message: 'No matching jobs found' });
            } else {
                const matchedJobs = allJobs.filter(job => response.data.some(match => match.description === job.description));
                jobs = matchedJobs.slice((page - 1) * pageSize, page * pageSize);
            }
        } else {
            jobs = await Job.find(query)
                            .populate('recruiter')
                            .skip((page - 1) * pageSize)
                            .limit(Number(pageSize));
        }

        const totalJobs = await Job.countDocuments(query);
        res.status(200).json({ jobs, totalJobs });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Apply to a job
exports.applyToJob = async (req, res) => {
    const { candidateId } = req.candidate;
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId).populate('recruiter');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const existingApplication = await Application.findOne({ job: jobId, candidate: candidateId });
        if (existingApplication) {
            return res.status(409).json({ message: 'You have already applied to this job' });
        }

        const newApplication = new Application({
            job: jobId,
            candidate: candidateId
        });
        await newApplication.save();

        // Send notification to recruiter
        const candidate = await Candidate.findById(candidateId);
        const newNotification = new Notification({
            recipientType: 'Recruiter',
            recipient: job.recruiter._id,
            senderType: 'Candidate',
            sender: candidateId,
            message: `Candidate ${candidate.fullName} applied to your job: ${job.title}. Please review their profile.`,
            link: `/jobs/${jobId}/applications`
        });
        await newNotification.save();

        res.status(201).json({ message: "Application submitted successfully", applicationId: newApplication._id });
    } catch (error) {
        res.status(500).json({ message: "Failed to submit application", error: error.message });
    }
};

// Get applications by job ID
exports.getApplicationsByJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        const applications = await Application.find({ job: jobId }).populate({
            path: 'candidate',
            select: 'username fullName email'
        });

        if (!applications.length) {
            return res.status(404).json({ message: 'No applications found for this job.' });
        }

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch applications", error: error.message });
    }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    try {
        const application = await Application.findById(applicationId).populate({
            path: 'job',
            populate: {
                path: 'recruiter',
                select: 'companyName'
            }
        });
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status;
        await application.save();

        const jobTitle = application.job.title;
        const recruiterName = application.job.recruiter.companyName;

        const notificationMessage = `Your application for the position ${jobTitle} has been updated to ${status} by ${recruiterName}.`;

        await sendNotification(
            req.user._id,
            'Recruiter',
            application.candidate,
            'Candidate',
            notificationMessage,
            `/applications/${applicationId}`
        );

        res.status(200).json({ message: "Application status updated successfully", application });
    } catch (error) {
        console.error("Failed to update application status:", error);
        res.status(500).json({ message: "Failed to update application status", error: error.message });
    }
};
