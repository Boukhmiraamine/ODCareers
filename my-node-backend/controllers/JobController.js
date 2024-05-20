const Job = require('../models/Job');
const Candidate = require('../models/Candidate');
const Application = require('../models/Application');
const { sendNotification } = require('../helpers/notificationHelper');
const Notification = require('../models/Notification');
const axios = require('axios');

exports.createJob = async (req, res) => {
    try {
        const newJob = new Job({ ...req.body, isApproved: false });
        await newJob.save();
        res.status(201).json({ message: "Job created and pending approval", job: newJob });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ isApproved: true }).populate('recruiter');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

exports.getJobs = async (req, res) => {
    console.log("Searching jobs with query:", req.query);
    const { search, contractType, workMode, semanticSearch, recruiterId } = req.query;

    let query = {
        isApproved: true,
        ...(contractType && { contractType }),
        ...(workMode && { workMode }),
        ...(recruiterId && { recruiter: recruiterId }) // Filter by recruiterId if provided
    };

    if (search && !semanticSearch) {
        query.$text = { $search: search };
        try {
            const jobs = await Job.find(query).populate('recruiter');
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    } else if (search && semanticSearch) {
        try {
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
                res.status(200).json(matchedJobs);
            }
        } catch (error) {
            console.error('Error when calling the Python API:', error.message);
            res.status(500).json({ message: "Failed to call Python API", error: error.message });
        }
    } else {
        try {
            const jobs = await Job.find(query).populate('recruiter');
            res.status(200).json(jobs);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

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

        // Envoyer une notification au recruteur
        const candidate = await Candidate.findById(candidateId);
        const newNotification = new Notification({
            recipientType: 'Recruiter',
            recipient: job.recruiter._id,
            senderType: 'Candidate',
            sender: candidateId,
            message: `Le candidat ${candidate.fullName} a postulé à votre offre: ${job.title}. Veuillez consulter son profil.`,
            link: `/jobs/${jobId}/applications` // Assurez-vous que ce lien mène à un endroit pertinent dans votre application
        });
        await newNotification.save();

        res.status(201).json({ message: "Application submitted successfully", applicationId: newApplication._id });
    } catch (error) {
        res.status(500).json({ message: "Failed to submit application", error: error.message });
    }
};

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

/*exports.updateApplicationStatus = async (req, res) => {
    const { applicationId, status } = req.body;

    try {
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status;
        await application.save();

        // Notify candidate of status change
        await sendNotification(
            req.user._id,
            'Recruiter',
            application.candidate,
            'Candidate',
            `Your application status has been updated to ${status}.`,
            `/applications/${applicationId}`
        );

        res.status(200).json({ message: "Application status updated successfully", application });
    } catch (error) {
        res.status(500).json({ message: "Failed to update application status", error: error.message });
    }
};*/

exports.updateApplicationStatus = async (req, res) => {
    const { applicationId } = req.params;
    const { status } = req.body;

    try {
        const application = await Application.findById(applicationId).populate({
            path: 'job',
            populate: {
                path: 'recruiter',
                select: 'companyName'  // Assurez-vous que le modèle Recruiter a un champ companyName
            }
        });
        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        application.status = status;
        await application.save();

        const jobTitle = application.job.title;  // Titre du poste à partir de l'objet job lié
        const recruiterName = application.job.recruiter.companyName;  // Nom du recruteur à partir de l'objet recruiter lié

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
