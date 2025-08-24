import express from 'express';
import { submitFeedback, getFeedbacks, deleteFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.post('/submit', submitFeedback);
router.get('/', getFeedbacks);
router.delete('/:id', deleteFeedback);

export default router;