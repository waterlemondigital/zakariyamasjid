import { Router } from 'express';
import {
  getAllCases,
  getCaseById,
  updateCase,
  updateCaseStatus,
  deleteCase,
  getDashboardStats,
} from '../controllers/welfareController';
import {
  getAllContactMessages,
  getContactMessageById,
  updateContactMessageStatus,
  deleteContactMessage,
  getContactStats,
} from '../controllers/contactController';
import { authenticateAdmin } from '../middleware/authMiddleware';

const router = Router();

// All routes here require valid admin authentication
router.use(authenticateAdmin);

// Dashboard metrics & KPIs
router.get('/dashboard-stats', getDashboardStats);

// ─────────────────────────────────────────────
// 1. WELFARE CASES MANAGEMENT
// ─────────────────────────────────────────────
router.get('/welfare-cases', getAllCases);
router.get('/welfare-cases/:id', getCaseById);
router.put('/welfare-cases/:id', updateCase);
router.patch('/welfare-cases/:id/status', updateCaseStatus);
router.delete('/welfare-cases/:id', deleteCase);

// ─────────────────────────────────────────────
// 2. CONTACT INQUIRIES MANAGEMENT
// ─────────────────────────────────────────────
router.get('/contacts-stats', getContactStats);
router.get('/contacts', getAllContactMessages);
router.get('/contacts/:id', getContactMessageById);
router.patch('/contacts/:id/status', updateContactMessageStatus);
router.delete('/contacts/:id', deleteContactMessage);

export default router;
