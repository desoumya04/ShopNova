import {Router} from 'express';
import {authMiddleware} from '../middleware/auth.middleware.js'
import {wishListController} from '../controllers/wishList.controller.js'

const wishListRoute = Router()

wishListRoute.post('/wishlist/:productId',authMiddleware,wishListController.addToWishlist)

wishListRoute.get('/wishlist',authMiddleware,wishListController.getUserWishList)
    
export {wishListRoute} 