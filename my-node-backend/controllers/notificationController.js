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
        res.status500.json({ message: 'Failed to fetch notifications', error });
    }
}

async function sendNotification(req, res) {
    const { recipientId, message, recipientType, senderId, senderType, link } = req.body;

    console.log('sendNotification called with:', { recipientId, message, recipientType, senderId, senderType, link });

    try {
        if (!recipientId || !message || !recipientType || !senderId || !senderType || !link) {
            console.log('Invalid request data', { recipientId, message, recipientType, senderId, senderType, link });
            return res.status(400).json({ message: 'Invalid request data' });
        }

        const newNotification = new Notification({
            recipient: recipientId,
            message: message,
            recipientType: recipientType,
            sender: senderId,
            senderType: senderType,
            link: link,
            read: false
        });

        await newNotification.save();
        res.status(201).json({ message: 'Notification sent successfully', notification: newNotification });
    } catch (error) {
        console.error('Error in sendNotification:', error);
        res.status(500).json({ message: 'Failed to send notification', error: error.message });
    }
}

async function scheduleInterview(req, res) {
    const { candidateId, recruiterId, scheduledDate } = req.body;
    try {
      const interview = new Interview({ candidateId, recruiterId, scheduledDate });
      await interview.save();
      
      // Generate video call link
      const videoCallLink = `/video-call/${interview._id}`;
      
      // Send notification to candidate about scheduled interview
      const message = `Your interview is scheduled for ${new Date(scheduledDate).toLocaleString()}`;
      await sendNotification({
        body: {
          recipientId: candidateId,
          message,
          recipientType: 'Candidate',
          senderId: recruiterId,
          senderType: 'Recruiter',
          link: videoCallLink
        }
      });
  
      res.status(201).json(interview);
    } catch (error) {
      res.status(500).json({ message: 'Error scheduling interview', error });
    }
  }
  
  module.exports = {
    getAllNotifications,
    getNotification,
    markNotificationRead,
    deleteNotification,
    getNotificationsForRecruiter,
    getNotificationsForCandidate,
    sendNotification,
    scheduleInterview
  };