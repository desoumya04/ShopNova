import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { orderControllerInstance } from '../controllers/order.controller.js';

const orderRouter = Router()


orderRouter.get('/fetchSuccessOrder',authMiddleware,orderControllerInstance.fetchSuccessOrder)

export default orderRouter
