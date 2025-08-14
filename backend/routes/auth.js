// backend/routes/auth.js
import express from 'express';
const router = express.Router();
import ctrl from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.get('/me', auth, ctrl.getUser);

export default router;
