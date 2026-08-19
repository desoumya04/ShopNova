import {Router} from 'express'
import {authMiddleware} from '../middleware/auth.middleware.js'
import {paymentControllerInstance} from '../controllers/payment.controller.js'

const paymentRouter = Router()


paymentRouter.post('/payment/create-order/:orderId',authMiddleware,paymentControllerInstance.createPaymentOrder )
paymentRouter.post('/payment/verify/:orderId',authMiddleware,paymentControllerInstance.verifyPayment )


export default paymentRouter;
