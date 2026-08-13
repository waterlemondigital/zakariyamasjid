import { Router } from 'express';
import { login, getMe } from '../controllers/authController';
import { authenticateAdmin } from '../middleware/authMiddleware';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public login with strict brute-force rate limiter
router.post('/login', authLimiter, login);

// Protected session check
router.get('/me', authenticateAdmin, getMe);

export default router;
