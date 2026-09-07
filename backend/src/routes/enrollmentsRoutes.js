import { Router } from 'express';
import { postEnrollment } from '../controllers/enrollmentsController.js';
import { submissionRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', submissionRateLimiter, postEnrollment);

export default router;
