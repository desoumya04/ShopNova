import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { wishlistService } from "../service/wishList.service.js";

class wishList{

    addToWishlist = asyncHandler(async (req,res)=>{

        console.log("req",req.body)
        const userId = req.user?.id
        if(!userId){
            throw new apiError(401,'Unauthorized: User ID missing')
        }
        const productId = req.params.productId as string
        if(!productId){
            throw new apiError(400,'Product ID is required')
        }
        const wishlistItem = await wishlistService.toggleWishlist(userId,productId)
        res.status(200).json(
            new apiResponse(200,wishlistItem,'Product added to wishlist successfully')
        )
    })

    getUserWishList = asyncHandler(async (req,res)=>{
        const userId = req.user?.id
        if(!userId){
            throw new apiError(401,'Unauthorized: User ID missing')
        }
        const wishlist = await wishlistService.getUserWishList(userId)
        res.status(200).json(
            new apiResponse(200,wishlist,'Wishlist fetched successfully')
        )
    })
}

export const wishListController = new wishList();