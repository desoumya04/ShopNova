import cron from "node-cron";
import {prisma} from "../config/db.js";


export const startAbndonedOrderCron = () => {
    cron.schedule('*/5 * * * *',async() =>{
        try{
            const cutoff = new Date(Date.now() - 15 * 60 * 1000)
            console.log(`Running abandon order cron at ${cutoff}`)
            const abandonedOrders = await prisma.order.findMany({
                where:{
                    status:"PENDING",
                    paymentStatus:"UNPAID",
                    createdAt:{
                        lt:cutoff
                    }
                },
                include:{
                    items:true
                }
            })
            
            if(abandonedOrders.length == 0){
                return
            }
            
            for(const order of abandonedOrders){
                try {
                    // here we are updating the order status to cancelled
                    await prisma.$transaction(async(tx)=>{
                        await tx.order.update({
                            where:{
                                id:order.id
                            },
                            data:{
                                status:"CANCELLED",
                                paymentStatus:"FAILED"
                            }
                        })

                        // here we are increasing the stock of the product
                        for(const item of order.items){
                            if (item.productId) {
                                await tx.product.update({
                                    where:{
                                        id:item.productId
                                    },
                                    data:{
                                        stock:{
                                            increment:item.quantity
                                        }
                                    }
                                })
                            }
                        } 
                        
                    })
                } catch (error) {
                    console.error(`Failed to process order ${order.id}`,error)
                }
                
            }
            
            

        }catch(error){
            console.log("Cron error",error)
        }
    })
}