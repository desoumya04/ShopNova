import express from 'express';
import { sellerController } from '../controllers/seller.controller.js';


const router = express.Router();

router.post('/seller/register', sellerController.createSeller)



export default router;