import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import {paymentServiceInstance} from '../service/payment.service.js'
import { apiResponse } from "../utils/apiResponse.js";

class paymentController{

    createPaymentOrder = asyncHandler(async (req,res)=>{

        const userId = req.user?.id;
        if(!userId){
            throw new apiError(401,"unauthorized")
        }  
        
      const orderId = req.params.orderId as string;  
      
      
      const order = await paymentServiceInstance.createOrder(orderId)
     
      return res.status(200).json(new apiResponse(200,{order,key:process.env.RAZORPAY_KEY_ID},"order created successfully"))
    })   

    verifyPayment = asyncHandler(async (req,res)=>{
      const userId = req.user?.id;
      if(!userId){
        throw new apiError(401,"unauthorized")
      } 
      
      const orderId = req.params.orderId as string;  
      const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
      const order = await paymentServiceInstance.verifyPayment(orderId,razorpay_order_id,razorpay_payment_id,razorpay_signature)
      return res.status(200).json(new apiResponse(200,{order},"payment verified successfully"))
    })    


}


export const paymentControllerInstance = new paymentController()

