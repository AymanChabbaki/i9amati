// backend/routes/unionAgent.js
import express from 'express';
const router = express.Router();
import ctrl from '../controllers/unionAgentController.js';
import { auth, requireRole } from '../middleware/auth.js';

// Add apartment
router.post('/apartments', auth, requireRole('union_agent'), ctrl.addApartment);
// List apartments
router.get('/apartments', auth, requireRole('union_agent'), ctrl.listApartments);
// Add resident
router.post('/apartments/resident', auth, requireRole('union_agent'), ctrl.addResident);
// Remove resident
router.delete('/apartments/resident', auth, requireRole('union_agent'), ctrl.removeResident);
// Edit apartment
router.put('/apartments', auth, requireRole('union_agent'), ctrl.editApartment);

export default router;
