import passport from 'passport';
import { Router } from 'express';
import authController from "../controllers/authController.js"


const router = Router();


router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))


router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/log')
  }
)

router.get('/logout', async (req, res) => {
  req.logout()
  res.redirect('/')
})

export default router;
