import express from 'express';
import { sellerController } from '../controllers/seller.controller.js'; 
import { authMiddleware } from '../middleware/auth.middleware.js';


const sellerRouter = express.Router();



sellerRouter.post('/seller/register',authMiddleware, sellerController.createSeller)
sellerRouter.post('/seller/login', authMiddleware,sellerController.sellerLogin)




export {sellerRouter}