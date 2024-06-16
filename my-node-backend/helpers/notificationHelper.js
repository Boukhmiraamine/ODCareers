
const Notification = require('../models/Notification');

/**
 * @param {ObjectId} senderId 
 * @param {string} senderType 
 * @param {ObjectId} recipientId 
 * @param {string} recipientType 
 * @param {string} message 
 * @param {string} link 
 */
async function sendNotification(recipientId, message, recipientType, senderId, senderType, link) {
  try {
      const notification = new Notification({
          recipient: recipientId,
          message: message,
          recipientType: recipientType,
          sender: senderId,
          senderType: senderType,
          link: link,
          read: false
      });

      await notification.save();
      console.log('Notification sent:', notification);
  } catch (error) {
      console.error('Error in sendNotification:', error);
      throw error;
  }
}

module.exports = { sendNotification };
