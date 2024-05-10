// routes/adminRoutes.js
import express from 'express';
const router = express.Router();
import adminController from '../controllers/adminController';
import authMiddleware from '../middleware/authMiddleware';


// Admin routes (require admin role)
router.use(authMiddleware.authenticate);
router.use(authMiddleware.isAdmin);

router.get('/profiles', adminController.getAllProfiles);
router.get('/profiles/:userId', adminController.getProfileById);
router.put('/profiles/:userId', adminController.updateProfile);

module.exports = router;
