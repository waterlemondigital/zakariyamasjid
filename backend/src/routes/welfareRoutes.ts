import { Router } from 'express';
import {
  submitApplication,
  getPublicApprovedCases,
} from '../controllers/welfareController';
import { applicationLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public: Submit welfare application with spam limiter
router.post('/apply', applicationLimiter, submitApplication);

// Public: Get list of approved cases for the website
router.get('/public', getPublicApprovedCases);

export default router;
