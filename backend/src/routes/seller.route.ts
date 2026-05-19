import express from 'express';
import { sellerController } from '../controllers/seller.controller.js';
import { authController } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/seller/register', sellerController.createSeller)
router.post('/seller/add_bank_details', sellerController.addBankDetails )
router.post('/seller/add_business_details', sellerController.addBusinessDetails)
router.put('/seller/update', sellerController.updateSeller) 
router.delete('/seller/delete', sellerController.deleteSeller)
router.post('/seller/login',authController.login)
router.post('/seller/verify_otp',authController.verifyOtp)
export default router;