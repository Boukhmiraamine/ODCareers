const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    contractType: { type: String, required: true },
    city: { type: String, required: true },
    recruiter: { type: Schema.Types.ObjectId, ref: 'Recruiter', required: true },
    domain: { type: String, required: true },
    function: { type: String, required: true },
    salary: { type: Number, required: true },
    educationLevel: { type: String, required: true },
    publicationDate: { type: Date, required: true },
    requiredSkills: [{ type: String, required: true }],
    isApproved: { type: Boolean, default: false },
    applications: [{ type: Schema.Types.ObjectId, ref: 'Application' }]  
}, { timestamps: true });

jobSchema.index({ title: 'text', description: 'text', city: 'text', 'recruiter.companyName': 'text' });

module.exports = mongoose.model('Job', jobSchema);
