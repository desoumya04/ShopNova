import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';


class orderService {
    featchSuccessOrder = async (userId:string)=> {
       
        const orders = await prisma.order.findMany({
            where: {
                userId: userId,
                paymentStatus: "PAID",
            },
            include: {
                items: {
                    include: {
                        product:{
                            include:{
                                images:true,
                                seller:{
                                    include:{
                                        business:true
                                    }
                                },
                                variants:true
                            }
                        },
                    },
                },
            },
        });

        if(!orders){
            throw new apiError(404,"No orders found");
        }
        return orders;
    }

    featchSellerSuccessOrder = async (userId:string)=> {

        const seller = await prisma.seller.findUnique({
            where:{userId:userId},
        })
       
        const orders = await prisma.order.findMany({
            where: {
                items:{
                    some: {
                        product:{sellerId:seller?.id}
                    }
                },
                paymentStatus: "PAID",
            },
            include: {
                user:{
                    select: {
                        name:true,
                    }
                },
                items: {
                    include: {
                        product:{
                            include:{
                                images:true,
                                seller:{
                                    include:{
                                        business:true
                                    }
                                },
                                variants:true
                            }
                        },
                    },
                },
            },
        });

        if(!orders){
            throw new apiError(404,"No orders found");
        }
        return orders;
    }
}


export const orderServicInstance = new orderService()