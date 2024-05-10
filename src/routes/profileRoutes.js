// routes/profileRoutes.js
import express from 'express';
const router = express.Router();
import profileController from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Public routes
router.get('/public', profileController.getPublicProfiles);
router.get('/:userId', profileController.getProfileById);

// Authenticated routes (require authentication)
router.use(authMiddleware.authenticate);
router.put('/:userId', profileController.updateProfile);
router.put('/:userId/privacy', profileController.setProfilePrivacy);

export default router;