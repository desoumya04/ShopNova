import { Router } from 'express';

import { userController } from '../controllers/user.controller.js';
import { authController } from '../controllers/auth.controller.js';



import { authMiddleware } from '../middleware/auth.middleware.js';

const userRouter = Router();

userRouter.post('/auth/signup', userController.signUp)
userRouter.post('/auth/verify_otp', authController.verifyOtp)
userRouter.post('/auth/login', userController.userLogin)
userRouter.get('/auth/check', authController.checkAuth)
userRouter.post('/auth/logout', authController.logout)
userRouter.get('/user/profile', authMiddleware, userController.userDetails)
userRouter.post('/user/profile/update', authMiddleware, userController.updateUser)




export { userRouter }
