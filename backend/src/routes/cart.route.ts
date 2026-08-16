import {Router} from 'express';
import { cartControllerInstance } from '../controllers/cart.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const addToCartRouter = Router();

addToCartRouter.post('/product/:productId/add-to-cart',authMiddleware,cartControllerInstance.addToCart)
addToCartRouter.get('/cart', authMiddleware, cartControllerInstance.getUserCart)
addToCartRouter.put('/cart/item/:productId', authMiddleware, cartControllerInstance.updateCartItem)


export {addToCartRouter}