import { sellerLoginSchema, sellerSignupSchema, sellerAddressSchema, sellerBusinessSchema, sellerBusinessAddressSchema, sellerBankSchema } from "../schema/seller.schema.js";
import { AuthService } from "../service/auth.service.js";
import { sellerService } from "../service/seller.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { JWTProviderInstance } from "../utils/jwtProvider.js";



class SellerController {
  
  createSeller = asyncHandler(async (req,res) =>{
    console.log(req.body)
    const safeSllerDataParse = sellerSignupSchema.safeParse(req.body.seller)
    const safeSellerAddressParse = sellerAddressSchema.safeParse(req.body.sellerAddress)
    const safeBusinessParse = sellerBusinessSchema.safeParse(req.body.business)
    const safeBusinessAddressParse = sellerBusinessAddressSchema.safeParse(req.body.businessAddress)
    const safeBankParse = sellerBankSchema.safeParse(req.body.bank)

    if(!safeSllerDataParse.success){
      throw new apiError(400, 'Invalid seller data')
    }
    if(!safeSellerAddressParse.success){
      throw new apiError(400, 'Invalid seller address data')
    }
    if(!safeBusinessParse.success){
      throw new apiError(400, 'Invalid business data')
    }
    if(!safeBusinessAddressParse.success){
      throw new apiError(400, 'Invalid business address data')
    }
    if(!safeBankParse.success){
      throw new apiError(400, 'Invalid bank data')
    }

    const userId = req.user?.id
    if (!userId) {
      throw new apiError(401, 'Unauthorized: User ID missing');
    }
    console.log("userId",userId)
    const data= { 
      seller:safeSllerDataParse.data,
      sellerAddress:safeSellerAddressParse.data,
      business:safeBusinessParse.data,
      businessAddress:safeBusinessAddressParse.data,
      bank:safeBankParse.data
    }
    
    const seller = await sellerService.register(userId,data);
    
  res
  .status(201)
  .cookie('token',seller, JWTProviderInstance.cookieOptions())
  .json(
    new apiResponse(201,seller,'Seller created successfully')
  )

  })

  sellerLogin = asyncHandler(async (req,res) =>{
    
    const result = await sellerService.sellerLogin(req.body);

    // If result contains a JWT, set it as a cookie
    if (result && typeof result === 'object' && 'jwt' in result) {
      const { jwt, ...rest } = result as any;
      res
      .status(200)
      .cookie('token', jwt, JWTProviderInstance.cookieOptions())
      .json(
        new apiResponse(200, rest, 'OTP sent successfully')
      );
    } else {
      res
      .status(200)
      .json(
        new apiResponse(200, result, 'OTP sent successfully')
      );
    }

  })

  
}

export const sellerController = new SellerController();