import {productServiceInstance} from "../service/product.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



class productController{
  createProduct = asyncHandler(async(req,res) =>{
    const authHeader = req.headers.authorization
    console.log("products",req.body)
    const token = ((authHeader?.startsWith("Bearer") ? authHeader.split(" ")[1] : "undefined"))

    const newProduct = await productServiceInstance.createProduct(token,req.body,req.files)
    console.log("newProduct", newProduct)
    res.status(201).json(new apiResponse(201, newProduct, 'Product created successfully'));
  })

  sellerProductDetails = asyncHandler(async(req,res) =>{
    const authHeader = req.headers.authorization

    const token = (authHeader?.startsWith("Bearer")?authHeader.split(" ")[1] : "undefined")

    const fetchDetails = await productServiceInstance.sellerProductDetails(token)
    res.status(201).json(new apiResponse(201,fetchDetails,"the details is fetch successfully"))
  })

  getCategory = asyncHandler(async(req,res) =>{
    const categories = await productServiceInstance.getCategory();
    res.status(200).json(new apiResponse(200,categories,'Categories fetched successfully'));
  })

}

export const productControllerInstance = new productController
