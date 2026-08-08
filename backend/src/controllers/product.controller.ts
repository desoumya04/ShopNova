import {productServiceInstance} from "../service/product.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



class productController{
  createProduct = asyncHandler(async(req,res) =>{
    const authHeader = req.headers.authorization

    const token = (authHeader?.startsWith("Bearer") ? authHeader.split(" ")[1] : "undefined")

    await productServiceInstance.createProduct(token,req.body,req.file)
  })

  getCategory = asyncHandler(async(req,res) =>{
    const categories = await productServiceInstance.getCategory();
    res.status(200).json(new apiResponse(200,categories,'Categories fetched successfully'));
  })

}

export const productControllerInstance = new productController
