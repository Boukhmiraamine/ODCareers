const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Authentication failed: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Authentication failed: Invalid token" });
    }
};
function checkIfRecruiter(req, res, next) {
    if (req.user.role === 'Recruiter') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Only recruiters are allowed." });
    }
}

function checkIfCandidate(req, res, next) {
    if (req.user.role === 'Candidate') {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Only candidates are allowed." });
    }
}
module.exports = { checkIfRecruiter, checkIfCandidate };
