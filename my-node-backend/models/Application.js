const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
    applyDate: { type: Date, default: Date.now },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'] },
    comments: { type: String }  
}, {
    timestamps: true  
});

applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });

applicationSchema.post('save', async function(doc) {
    console.log(`New application submitted: ${doc._id}`);
});

applicationSchema.methods.isAccepted = function() {
    return this.status === 'Accepted';
};

module.exports = mongoose.model('Application', applicationSchema);
