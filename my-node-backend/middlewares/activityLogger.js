const UserActivity = require('../models/UserActivity');

// Middleware pour enregistrer les activités de recherche
function logSearchActivity(req, res, next) {
    if (req.method === 'GET' && req.query.search) {
        const newActivity = new UserActivity({
            candidateId: req.candidate._id,  
            actionType: 'search',
            details: req.query.search
        });
        newActivity.save();
    }
    next();
}

// Middleware pour enregistrer les consultations de jobs
function logViewActivity(req, res, next) {
    if (req.method === 'GET' && req.params.id) {
        const newActivity = new UserActivity({
            candidateId: req.candidate._id,
            jobId: req.params.id,
            actionType: 'view'
        });
        newActivity.save();
    }
    next();
}

module.exports = { logSearchActivity, logViewActivity };
