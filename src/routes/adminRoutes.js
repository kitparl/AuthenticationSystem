// routes/adminRoutes.js
import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController.js';
import authMiddleware from '../middleware/authMiddleware.js';


// Admin routes (require admin role)
router.use(authMiddleware.authenticate);
router.use(authMiddleware.isAdmin);

router.get('/profiles',authMiddleware.jwtAuthMiddleware, authMiddleware.isAdmin, adminController.getAllProfiles);
router.get('/profiles/:userId',authMiddleware.jwtAuthMiddleware, authMiddleware.isAdmin, adminController.getProfileById);
router.put('/profiles/:userId',authMiddleware.jwtAuthMiddleware, authMiddleware.isAdmin, adminController.updateProfile);

export default router;
