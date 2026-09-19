import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';


export async function calculateAndCreatePayouts(orderId: string) {


    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            items: true
        }
    })

    if (!order || order.paymentStatus !== 'PAID') {
        throw new apiError(400, "order is not found or not paid")
    }
    // Already generated, exit safely
    if (order.isPayoutGenerated) {
        return;
    }

    const sellerMap: Record<string, number> = {}
    for (const item of order.items) {
        if (!item.sellerId) continue
        if (!sellerMap[item.sellerId]) {
            sellerMap[item.sellerId] = 0
        }
        sellerMap[item.sellerId] += Number(item.price) * item.quantity
    }

    const sellerEntries = Object.entries(sellerMap)
    if (sellerEntries.length === 0) {
        throw new apiError(400, "No seller found for this order")
    }

    const Platform_Commission = 0.10

    await prisma.$transaction(async (tx) => {
        const payoutPromises = sellerEntries.map(([sellerId, grossAmount]) => {
            const commission = grossAmount* Platform_Commission
            const netAmount = grossAmount - commission
            return tx.payout.create({
                data: {
                    sellerId: sellerId,
                    orderId:orderId,
                    amount: netAmount,
                    currency:'INR',
                    status:"PENDING",
                    note:`Earnings for Order #${orderId}`,
                }
            })
        })

        await Promise.all(payoutPromises)

        await tx.order.update({
            where:{
                id:orderId
            },
            data:{
                isPayoutGenerated:true
            }
        })
    }) 

}