import { Router } from 'express';
import { submitContactMessage, verifySmtpStatus } from '../controllers/contactController';
import { applicationLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public contact submission with anti-spam rate limiting
router.post('/submit', applicationLimiter, submitContactMessage);

// Live SMTP diagnostics check
router.get('/verify-smtp', verifySmtpStatus);

export default router;
