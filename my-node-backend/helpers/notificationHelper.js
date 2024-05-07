
const Notification = require('../models/Notification');

/**
 * @param {ObjectId} senderId 
 * @param {string} senderType 
 * @param {ObjectId} recipientId 
 * @param {string} recipientType 
 * @param {string} message 
 * @param {string} link 
 */
async function sendNotification(senderId, senderType, recipientId, recipientType, message, link) {
  const notification = new Notification({
    sender: senderId,
    senderType: senderType,
    recipient: recipientId,
    recipientType: recipientType,
    message: message,
    link: link
  });

  try {
    await notification.save();a
    console.log("Notification sent successfully.");
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

module.exports = { sendNotification };
