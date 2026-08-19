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
                                seller:true,
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