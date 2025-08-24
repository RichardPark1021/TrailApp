import Feedback from '../models/feedbackModel.js';

export const submitFeedback = async (req, res) => {
    const { username, email, feedback } = req.body;

    try {
        const newFeedback = await Feedback.create({ username, email, feedback });
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const deleteFeedback = async (req, res) => {
    const { id } = req.params;

    try {
        await Feedback.findByIdAndRemove(id);
        res.status(200).json({ message: 'Feedback deleted successfully.' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};