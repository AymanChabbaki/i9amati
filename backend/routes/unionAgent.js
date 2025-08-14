// backend/routes/unionAgent.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/unionAgentController');
const { auth, requireRole } = require('../middleware/auth');

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

module.exports = router;
