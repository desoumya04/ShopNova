import express from 'express';
import { sellerController } from '../controllers/seller.controller.js';
import { authController } from '../controllers/auth.controller.js';
import {productControllerInstance } from '../controllers/product.controller.js';  

const router = express.Router();

router.post('/seller/register', sellerController.createSeller)
router.post('/seller/login', sellerController.sellerLogin)




export default router;