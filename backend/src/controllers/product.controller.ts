import {productServiceInstance} from "../service/product.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



class productController{
  createProduct = asyncHandler(async(req,res) =>{
    const userId = req.user?.id;
    if(!userId){
      throw new apiError(401, 'Unauthorized');
    }

    const newProduct = await productServiceInstance.createProduct(userId,req.body,req.files)
    
    res.status(201).json(new apiResponse(201, newProduct, 'Product created successfully'));
  })

  updateProduct = asyncHandler(async(req,res) =>{
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);
    const userId = req.user?.id;
    if(!userId){
      throw new apiError(401, 'Unauthorized');
    }

    const productId = req.params.productId as string;
    if(!productId) {
        throw new apiError(400, "Product ID is required");
    }
    console.log("productId",productId)
    const updatedProduct = await productServiceInstance.updateProduct(userId, productId, req.body,req.files)
    
    res.status(200).json(new apiResponse(200, updatedProduct, 'Product updated successfully'));
  })

  sellerProductDetails = asyncHandler(async(req,res) =>{
    const userId = req.user?.id;
    if(!userId){
      throw new apiError(401, 'Unauthorized');
    }

    const fetchDetails = await productServiceInstance.sellerProductDetails(userId)
    res.status(201).json(new apiResponse(201,fetchDetails,"the details is fetch successfully"))
  })

  getCategory = asyncHandler(async(req,res) =>{
    const categories = await productServiceInstance.getCategory();
    res.status(200).json(new apiResponse(200,categories,'Categories fetched successfully'));
  })

  getCategoryProducts = asyncHandler(async(req,res) =>{
    // authMiddleware ensures user is authenticated
    const products = await productServiceInstance.fetchCategoryWishProduct(req.body.category)
    
    res
    .status(200)
    .json(new apiResponse(200,products,"successfully Fetch the products"))
  })

  getProductById = asyncHandler(async(req,res)=>{
    // authMiddleware ensures user is authenticated
    const productId = req.query.productId as string;

    
    if(!productId){
      throw new apiError(400,"productId is required")
    }

    const products = await productServiceInstance.getProductByProductId(productId)

    res
    .status(200)
    .json(new apiResponse(200,products,"successfully Fetch the products"))
  })
  
}

export const productControllerInstance = new productController
