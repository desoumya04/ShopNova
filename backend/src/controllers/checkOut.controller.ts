import { checkOutServiceInstance } from "../service/checkOut.service.js";
import { userService } from "../service/user.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



class checkOutController{
    addOrderItem = asyncHandler(async(req,res)=>{
      const userId = req.user?.id;

      if(!userId){
        throw new apiError(401,"user not logged in")
      }
    
     

      const order = await checkOutServiceInstance.addOrderItem(userId,req.body);
      res.status(201).json(new apiResponse(201,order,"order created successfully")) 
    
    })  


    fetchOrderDetail = asyncHandler(async(req,res)=>{
      const userId = req.user?.id;

      if(!userId){
        throw new apiError(401,"user not logged in")
      }

      const orderId = req.params.orderId as string;
  
      if(!orderId){
        throw new apiError(400,"order id is required")
      }

        const order = await checkOutServiceInstance.featchOrderDeatails(orderId);
      
        res.status(200).json(new apiResponse(200,order,"order details fetched successfully"))
    })  

    changeSipingAdress = asyncHandler(async(req,res)=>{

      const userId = req.user?.id;

      if(!userId){
        throw new apiError(401,"user not logged in")
      }

      const orderId = req.params.orderId as string;

      if(!orderId){
        throw new apiError(400,"order id is required")
      }

        
        const order = await checkOutServiceInstance.changeSipingAdress(orderId,req.body.addressId);
        res.status(200).json(new apiResponse(200,"","order details fetched successfully"))
    })

    addNewShipingAdress = asyncHandler(async(req,res)=>{

      const userId = req.user?.id;

      if(!userId){
        throw new apiError(401,"user not logged in")
      }

      const orderId = req.params.orderId as string;

      if(!orderId){
        throw new apiError(400,"order id is required")
      }
        
        const order = await checkOutServiceInstance.addShippingAddress(userId,orderId,req.body);
        res.status(200).json(new apiResponse(200,"  ","morder details fetched successfully"))
    })  
    
}


export const checkOutControllerInstance = new checkOutController;