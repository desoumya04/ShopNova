
import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';

interface ShippingDetails {
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingPinCode: number;
}

interface CheckoutPayload {
    checkOutMode: "DIRECT" | "CART";
    quantity?: number;
    productId?: string;
    shippingDetails: ShippingDetails; // Required by your Order schema
}

interface NormalizedItem {
    productId: string;
    quantity: number;
}


class checkOutService {
    addOrderItem = async (userId: string, itemData: CheckoutPayload) => {


        const order = await prisma.$transaction(async (tx) => {
            //step 1 : Normalize the data
            let itemToBuy: NormalizedItem[] = []
            // if mode is DIRECT
            if (itemData.checkOutMode === "DIRECT") {
                const { quantity, productId } = itemData
                if (!quantity || !productId) {
                    throw new apiError(400, 'Product ID and quantity are required for direct checkout')
                }
                itemToBuy = [{ productId, quantity }]

            }
            //if Mode is CART
            else if (itemData.checkOutMode === "CART") {
                const userCart = await tx.cart.findUnique({
                    where: { userId },
                    include: {
                        items: {
                            select: {
                                productId: true,
                                quantity: true
                            }
                        }
                    }
                })
                if (!userCart) {
                    throw new apiError(404, 'Cart not found')
                }
                if (userCart.items.length === 0) {
                    throw new apiError(400, 'Cart is empty')
                }
                itemToBuy = userCart.items
            }


            // step 2 : validate price and reserve inventory(for all items)
            let totalPrice = 0
            let Discount = 0
            // array to snapshot hold the snapshots from DB
            const orderItemData = []

            for (const item of itemToBuy) {
                // featch the product details
                const product = await tx.product.findUnique({
                    where: { id: item.productId },
                    select: {
                        name: true,
                        price: true,
                        sellerId: true,
                        discountPrice: true
                    }
                })
                if (!product) {
                    throw new apiError(404, 'Product not found')
                }

                totalPrice += Number(product.price) * item.quantity
                Discount += Number(product.discountPrice) * item.quantity

                //here we will store all the order item details
                const inventory = await tx.inventory.update({
                    where: {
                        productId: item.productId,
                    },
                    data: {
                        reserved: item.quantity,
                    }
                })
                if (inventory.reserved > item.quantity) {
                    throw new apiError(400, 'Product is out of stock')
                }
                // update the product stock
                await tx.product.update({
                    where: {
                        id: item.productId
                    },
                    data: {
                        stock: { decrement: item.quantity }
                    }
                })
                orderItemData.push({
                    productId: item.productId,
                    productName: product.name,
                    quantity: item.quantity,
                    price: product.price,
                    sellerId: product.sellerId
                })

            }

            // create one order
            const newOrder = await tx.order.create({
                data: {
                    userId: userId,
                    totalPrice: totalPrice,
                    finalPrice: totalPrice,
                    discountAmount: Discount,
                    status: "PENDING",
                    paymentStatus: "UNPAID",


                    // here the addressId will be store
                    // the user have to choose the address from the address table

                    shippingAddress: itemData.shippingDetails.shippingAddress,
                    shippingCity: itemData.shippingDetails.shippingCity,
                    shippingState: itemData.shippingDetails.shippingState,
                    shippingPinCode: itemData.shippingDetails.shippingPinCode,

                    items: {
                        create: orderItemData
                    },

                }


            })
            





            return { order: newOrder }
        })


        return order
    }


    featchOrderDeatails = async (orderId: string) => {
        return await prisma.order.findUnique({
            where: {
                id: orderId
            }, include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: true,
                                variants: true,
                            }
                        }
                    }
                }
            }
        })


    }

    changeSipingAdress = async (orderId: string, addressId: string) => {
        const address = await prisma.userAddress.findUnique({
            where: {
                id: addressId
            }
        })
        if (!address) {
            throw new apiError(404, "Address not found")
        }
        return await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                shippingAddress: address.address,
                shippingCity: address.locality,
                shippingState: address.state,
                shippingPinCode: address.pinCode,
            }
        })
    }

    addShippingAddress = async (userId: string, orderId: string, addressData: any) => {
        const address = await prisma.userAddress.create({
            data: {
                userId: userId,
                ...addressData
            }
        })

        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                shippingAddress: address.address,
                shippingCity: address.locality,
                shippingState: address.state,
                shippingPinCode: address.pinCode,
            }
        })
    }
}






export const checkOutServiceInstance = new checkOutService();