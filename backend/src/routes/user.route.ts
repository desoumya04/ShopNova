import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { authController } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/auth/signup', userController.createUser)
router.post('/auth/verify_otp',authController.verifyOtp)

export default router;
