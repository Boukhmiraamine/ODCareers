const Notification = require('../models/Notification');

async function getAllNotifications(req, res) {
    try {
        const notifications = await Notification.find({ recipient: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notifications", error: error.message });
    }
}

async function getNotification(req, res) {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch notification", error: error.message });
    }
}

async function markNotificationRead(req, res) {
    try {
        const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Failed to update notification", error: error.message });
    }
}

async function deleteNotification(req, res) {
    try {
        const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
        if (!deletedNotification) {
            return res.status(404).json({ message: "Notification not found" });
        }
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete notification", error: error.message });
    }
}

async function getNotificationsForRecruiter(req, res) {
    try {
        const notifications = await Notification.find({ recipient: req.params.userId, recipientType: 'Recruiter' });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications', error });
    }
}

async function getNotificationsForCandidate(req, res) {
    try {
        const notifications = await Notification.find({ recipient: req.params.userId, recipientType: 'Candidate' });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notifications', error });
    }
}

module.exports = {
    getAllNotifications,
    getNotification,
    markNotificationRead,
    deleteNotification,
    getNotificationsForRecruiter,
    getNotificationsForCandidate
};
