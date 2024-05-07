const Recruiter = require('../models/Recruiter');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');  
const Admin = require('../models/Admin');


exports.toggleUserActive = async (req, res) => {
    const { userId, userType } = req.params;
    const Model = userType === 'Recruiter' ? Recruiter : Candidate;
    
    try {
        const user = await Model.findById(userId);
        if (!user) return res.status(404).send({ message: "User not found" });

        user.isActive = !user.isActive;
        await user.save();
        res.status(200).send({ message: "User status updated", isActive: user.isActive });
    } catch (error) {
        res.status(500).send({ message: "Operation failed", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { userId, userType } = req.params;
    const Model = userType === 'Recruiter' ? Recruiter : Candidate;
    
    try {
        await Model.findByIdAndDelete(userId);
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Operation failed", error: error.message });
    }
};

exports.approveJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send({ message: "Job not found" });
        }

        job.isApproved = true;  
        await job.save();
        res.status(200).send({ message: "Job approved successfully" });
    } catch (error) {
        res.status(500).send({ message: "Operation failed", error: error.message });
    }
};


exports.deleteJob = async (req, res) => {
    const { jobId } = req.params;

    try {
        await Job.findByIdAndDelete(jobId);
        res.status(200).send({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Operation failed", error: error.message });
    }
};
