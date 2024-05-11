// routes/profileRoutes.js
import express from 'express';
const router = express.Router();
import profileController from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

// Route for creating or updating profiles after login
router.post('/create-or-update', authMiddleware.authenticate, profileController.createOrUpdateProfile);

// Public routes
router.get('/public',authMiddleware.authenticate, profileController.getPublicProfiles);
router.get('/:name',authMiddleware.authenticate, profileController.getProfileByName);

// Authenticated routes (require authentication)
router.use(authMiddleware.authenticate);
router.put('/privacy',authMiddleware.authenticate, profileController.setProfilePrivacy);

export default router;