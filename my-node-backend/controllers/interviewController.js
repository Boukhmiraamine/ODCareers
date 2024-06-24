const Interview = require('../models/Interview');
const { sendNotification } = require('../helpers/notificationHelper');
const Candidate = require('../models/Candidate');
const Recruiter = require('../models/Recruiter');

exports.scheduleInterview = async (req, res) => {
  try {
    const { candidateId, recruiterId, scheduledDate } = req.body;

    const candidate = await Candidate.findById(candidateId);
    const recruiter = await Recruiter.findById(recruiterId);

    if (!candidate || !recruiter) {
      return res.status(404).json({ message: 'Candidate or recruiter not found' });
    }

    const interview = new Interview({
      candidate: candidate._id,
      recruiter: recruiter._id,
      scheduledDate
    });

    await interview.save();

    const videoCallLink = `/video-call/${interview._id}`;

    const message = `Your interview is scheduled for ${new Date(scheduledDate).toLocaleString()}`;
    await sendNotification({
      recipientId: candidate._id,
      message,
      recipientType: 'Candidate',
      senderId: recruiter._id,
      senderType: 'Recruiter',
      link: videoCallLink
    });

    res.status(201).json({ message: 'Interview scheduled successfully', interview });
  } catch (error) {
    console.error('Error scheduling interview:', error);
    res.status(500).json({ message: 'Failed to schedule interview', error: error.message });
  }
};

exports.respondToInterview = async (req, res) => {
  const { interviewId } = req.params;
  const { decision, rescheduledDate } = req.body;

  try {
    const interview = await Interview.findById(interviewId);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    if (decision === 'confirm') {
      interview.status = 'confirmed';
    } else if (decision === 'reschedule') {
      interview.scheduledDate = rescheduledDate;
      interview.status = 'pending';
      await sendNotification({
        recipientId: interview.recruiter,
        message: `Candidate requested to reschedule the interview to ${new Date(rescheduledDate).toLocaleString()}.`,
        recipientType: 'Recruiter',
        senderId: interview.candidate,
        senderType: 'Candidate',
        link: `http://yourdomain.com/reschedule-interview/${interview._id}`
      });
    }

    await interview.save();
    res.status(200).json(interview);
  } catch (error) {
    console.error('Error responding to interview:', error);
    res.status(500).json({ message: "Failed to respond to interview", error });
  }
};

exports.getScheduledInterviewsByRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const interviews = await Interview.find({ recruiter: recruiterId }).populate('candidate', 'name email').exec();
    if (!interviews) {
      return res.status(404).json({ message: 'No interviews found for this recruiter' });
    }
    res.status(200).json(interviews);
  } catch (error) {
    console.error('Error fetching scheduled interviews:', error);
    res.status(500).json({ message: 'Failed to fetch scheduled interviews', error: error.message });
  }
};