import { Router } from 'express';
import { postLead } from '../controllers/leadsController.js';
import { submissionRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', submissionRateLimiter, postLead);

export default router;
