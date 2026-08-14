import { Router } from 'express';
import { submitContactMessage } from '../controllers/contactController';
import { applicationLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public contact submission with anti-spam rate limiting
router.post('/submit', applicationLimiter, submitContactMessage);

export default router;
