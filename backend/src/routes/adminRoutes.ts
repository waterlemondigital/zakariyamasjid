import { Router } from 'express';
import {
  getAllCases,
  getCaseById,
  updateCase,
  updateCaseStatus,
  deleteCase,
  getDashboardStats,
} from '../controllers/welfareController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// All routes here require valid admin authentication
router.use(authenticateAdmin);

// Dashboard metrics & KPIs
router.get('/dashboard-stats', getDashboardStats);

// Cases management
router.get('/welfare-cases', getAllCases);
router.get('/welfare-cases/:id', getCaseById);
router.put('/welfare-cases/:id', updateCase);
router.patch('/welfare-cases/:id/status', updateCaseStatus);
router.delete('/welfare-cases/:id', deleteCase);

export default router;
