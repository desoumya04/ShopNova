import { AuthService } from "../service/auth.service.js";
import { sellerService } from "../service/seller.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { JWTProviderInstance } from "../utils/jwtProvider.js";



class SellerController {
  
  createSeller = asyncHandler(async (req,res) =>{
    const seller = await sellerService.register(req.body);
    
  res
  .status(201)
  .cookie('token',seller, JWTProviderInstance.cookieOptions())
  .json(
    new apiResponse(201,seller,'Seller created successfully')
  )

  })

  sellerLogin = asyncHandler(async (req,res) =>{
    
    const seller = await sellerService.sellerLogin(req.body);
    res
    .status(200)
    .json(
      new apiResponse(200,seller,'OTP sent successfully')
    )

  })

  
}

export const sellerController = new SellerController();