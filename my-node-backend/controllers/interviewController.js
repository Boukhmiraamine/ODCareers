const Interview = require('../models/Interview');
const { sendNotification } = require('../helpers/notificationHelper');
const Candidate = require('../models/Candidate'); // Ensure you require the necessary models
const Recruiter = require('../models/Recruiter');

exports.scheduleInterview = async (req, res) => {
  try {
    const { candidateId, recruiterId, scheduledDate } = req.body;

    // Fetch the candidate and recruiter from the database
    const candidate = await Candidate.findById(candidateId);
    const recruiter = await Recruiter.findById(recruiterId);

    if (!candidate || !recruiter) {
      return res.status(404).json({ message: 'Candidate or recruiter not found' });
    }

    // Create a new interview
    const interview = new Interview({
      candidate: candidate._id,
      recruiter: recruiter._id,
      scheduledDate
    });

    // Save the interview to the database
    await interview.save();

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
      sendNotification(interview.recruiter, `Candidate requested to reschedule the interview to ${rescheduledDate}.`);
    }

    await interview.save();
    res.status(200).json(interview);
  } catch (error) {
    res.status(500).json({ message: "Failed to respond to interview", error });
  }
};
