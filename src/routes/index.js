import { Router } from 'express';
import googleAuth from '../middleware/auth.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router = Router();


router.get('/', googleAuth.ensureGuest ,(req, res) => {
    res.render('login')
  })

router.get("/log", googleAuth.ensureAuth, async(req,res)=>{
    res.render('index',{userinfo:req.user})
})

export default router;