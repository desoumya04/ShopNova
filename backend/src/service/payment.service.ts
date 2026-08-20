import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import { razorpay } from '../config/razorpay.js';
import crypto from "crypto"


class paymentService {

    async createOrder(orderId: string) {

        const getOrder= await prisma.order.findUnique({
            where: {
                id: orderId,
            }
        })
        
       if (!getOrder){
            throw new apiError(404, "Order not found")
       }

        const options = {
            amount: Number(getOrder.finalPrice) * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`
        }

        try {
            const order = await razorpay.orders.create(options);

            // store payment order in database
            const updatePayment = await prisma.payment.create({
                data: {
                    gatewayOrderId: order.id,
                    amount: getOrder.finalPrice,
                    status: "UNPAID",
                    method: "UPI",
                    provider: "razorpay",
                    order:{
                        connect:{
                            id:orderId,
                        }
                    },
                    user:{
                        connect:{
                            id:getOrder.userId,
                        }
                    }
                }
            })

            if(!updatePayment){
                throw new apiError(500, "Unable to update payment")
            }

            return order;
        } catch (error) {
            throw new apiError(500, "Unable to create Razorpay order")
        }
    }



    async verifyPayment(orderId: string, razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string) {

        const orderData = await prisma.payment.findUnique({
            where: {
                orderId: orderId,
            }
        })

        if (!orderData) {
            throw new apiError(404, "Order not found")
        }

        if (orderData.gatewayOrderId !== razorpay_order_id) {
            throw new apiError(404, "Order not found")
        }

        const body =
            razorpay_order_id +
            "|" +
            razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET!
            )
            .update(body)
            .digest("hex");


        if (expectedSignature != razorpay_signature) {


            throw new apiError(400, "Invalid payment signature")
        }

        // store payment order in database
        const updatePayment = await prisma.payment.update({
            where: {
                orderId: orderId,
            },
            data: {
                status: "PAID",
               transactionId: razorpay_payment_id,
            }
        })

        if(!updatePayment){
            throw new apiError(500,"Unable to update payment")
        }
        // update order status
        const updateorder = await prisma.order.update({
            where:{
                id:orderId,
            },
            data:{
                paymentStatus:"PAID",
                status:"CONFIRMED",
            }
        })
        if(!updateorder){
            throw new apiError(500,"Unable to update order")
        }
        // delete from cart
        const cart = await prisma.cart.findUnique({
            where: { userId: orderData.userId }
        });
        if (cart) {
            const deleteCart = await prisma.cartItem.deleteMany({
                where:{
                    cartId: cart.id,
                }
            })
            if(!deleteCart){
                throw new apiError(500,"Unable to delete cart")
            }
        }
        // update inventry
        const items = await prisma.orderItem.findMany({
            where:{
                orderId:orderId,
            }
        })

        for(const item of items){
            if (!item.productId) continue; // Skip if no product ID
            const updateInventory = await prisma.inventory.update({
                where:{
                    productId: item.productId,
                },
                data:{
                    quantity: {decrement:item.quantity},
                    reserved: 0,
                }
            })
            if(!updateInventory){
                throw new apiError(500,"Unable to update inventory")
            }
        }
        
        return orderData;

    }
}

export const paymentServiceInstance = new paymentService();