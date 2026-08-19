import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { checkOutControllerInstance } from '../controllers/checkOut.controller.js';


const checkOutRouter = Router();

checkOutRouter.post("/checkOut/addOrderItem",authMiddleware,checkOutControllerInstance.addOrderItem)
checkOutRouter.put("/checkOut/changeShippingAddress/:orderId",authMiddleware,checkOutControllerInstance.changeSipingAdress)
checkOutRouter.get("/fetchOrderDetail/:orderId",authMiddleware,checkOutControllerInstance.fetchOrderDetail)
checkOutRouter.post("/addShippingAddress/:orderId",authMiddleware,checkOutControllerInstance.addNewShipingAdress)


export default checkOutRouter