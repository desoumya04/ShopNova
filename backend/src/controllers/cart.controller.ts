import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cartService } from "../service/cart.service.js";



class cartController{
    addToCart = asyncHandler(async(req,res)=>{
    
      const userId = req.user?.id 
      const productId = req.body.productId as string;
      if(!productId){
        throw new apiError(400,"productId is required")
      }

      const quantity = req.body.quantity as number;
      if(!quantity){
        throw new apiError(400,"quantity is required")
      }

      const cartItem = await cartService.addToCart(userId,productId,quantity)
      res.status(200).json(new apiResponse(200,cartItem,"successfully added to cart"))
    })

    getUserCart = asyncHandler(async(req, res) => {
      const userId = req.user?.id;
      const cart = await cartService.getUserCart(userId);
      res.status(200).json(new apiResponse(200, cart, "Successfully fetched user cart"));
    })

    updateCartItem = asyncHandler(async(req, res) => {
      const userId = req.user?.id;
      const productId = req.params.productId as string;
      const quantity = req.body.quantity;

      if (!productId) {
        throw new apiError(400, "productId is required");
      }
      if (quantity === undefined || quantity === null) {
        throw new apiError(400, "quantity is required");
      }

      const cartItem = await cartService.updateCartItemQuantity(userId, productId, quantity);
      res.status(200).json(new apiResponse(200, cartItem, "Successfully updated cart item"));
    })

    
}


export const cartControllerInstance = new cartController();