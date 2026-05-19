import { AuthService } from "../service/auth.service.js";
import { sellerService } from "../service/seller.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { JWTProviderInstance } from "../utils/jwtProvider.js";



class SellerController {
  
  createSeller = asyncHandler(async (req,res) =>{

    const seller = await sellerService.createsSeller(req.body);
    
  res
  .status(201)
  .cookie('token',seller, JWTProviderInstance.cookieOptions())
  .json(
    new apiResponse(201,seller,'Seller created successfully')
  )

  })


  // updateSellerProfile
  
  updateSeller = asyncHandler(async (req,res) =>{
    const existingSeller = JWTProviderInstance.verifyToken(req.cookies.token);
    if(!existingSeller){
      throw new apiError(401, 'Unauthorized');
    }
    const updatedSeller = await sellerService.updateSellerProfile(existingSeller,req.body);
    res
    .status(200)
    .json(
      new apiResponse(200, updatedSeller, 'Seller updated successfully')
    );
  })
  
  // deleteSeller
  deleteSeller = asyncHandler(async (req,res) =>{
    const existingSeller = JWTProviderInstance.verifyToken(req.cookies.token);
    if(!existingSeller || typeof existingSeller === 'string'){
      throw new apiError(401, 'Unauthorized');
    }
    const deletedSeller = await sellerService.deleteSeller(existingSeller.id);
    res
    .status(200)
    .json(
      new apiResponse(200, deletedSeller, 'Seller deleted successfully')
    );
  })


  //get all sellers
  getSeller = asyncHandler(async (req,res) =>{
    const seller = await sellerService.getSeller(req.body.email);

  })
  
  
  // add business details
  addBusinessDetails = asyncHandler(async (req,res)=>{
    const businessDetails = await sellerService.addBusinessDetails(req);
    res
    .status(200)
    .json(
      new apiResponse(200, businessDetails, 'Business details added successfully')
    );

  })


  // add bank details
  addBankDetails = asyncHandler(async (req,res) =>{
    const bankDetails = await sellerService.addBankDetails(req);
    
    res
    .status(200)
    .json(
      new apiResponse(200, bankDetails, 'Bank details added successfully')
    );
  })

}

export const sellerController = new SellerController();