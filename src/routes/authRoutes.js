// routes/authRoutes.js
import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/social-login', authController.socialLogin);
router.post('/logout', authController.logout);

export default router;