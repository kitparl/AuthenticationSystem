import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';


router.post('/register', authController.register);
router.post('/login',authMiddleware.jwtAuthMiddleware, authController.login);
router.post('/logout',authMiddleware.authenticate, authController.logout);

export default router;