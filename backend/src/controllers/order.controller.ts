import { orderServicInstance } from "../service/order.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class orderController{
    fetchSuccessOrder = asyncHandler(async(req,res)=>{
        const userId = req.user?.id;
        if(!userId){
            throw new apiError(401,"unauthorized")
        }
        const orders = await orderServicInstance.featchSuccessOrder(userId)
        return res.status(200).json(new apiResponse(200,orders,"orders fetched successfully"))
    })
}

export const orderControllerInstance = new orderController()