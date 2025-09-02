// backend/routes/unionAgent.js
import express from 'express';

import * as ctrl from '../controllers/unionAgentController.js';

const router = express.Router();
import ctrl from '../controllers/unionAgentController.js';

import { auth, requireRole } from '../middleware/auth.js';

const router = express.Router();
// Add apartment (with address, type, owners)
router.post('/apartments', auth, requireRole('union_agent'), ctrl.addApartment);
// Property owner: get their own apartment and property details
router.get('/owner/apartment', auth, requireRole('property_owner'), ctrl.getOwnerApartment);
// List apartments
router.get('/apartments', auth, requireRole('union_agent'), ctrl.listApartments);
// Add resident
router.post('/apartments/resident', auth, requireRole('union_agent'), ctrl.addResident);
// Remove resident
router.delete('/apartments/resident', auth, requireRole('union_agent'), ctrl.removeResident);
// Edit apartment
router.put('/apartments', auth, requireRole('union_agent'), ctrl.editApartment);

export default router;
