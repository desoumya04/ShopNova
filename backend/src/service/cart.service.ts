import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';


class CartService {
    async addToCart(userId: string, productId: string, quantity: number) {
        try{
            // check product is exist or not 
            const product = await prisma.product.findUnique({
                where:{
                    id:productId,
                }
            })
            if(!product){
                throw new apiError(400,"Product is not exist")
            }

            // check stock
            if(product.stock < quantity){
                throw new apiError(400,"Product is out of stock")
            }

            // check cart item is exist or not
            
            let cart = await prisma.cart.findUnique({
                where:{
                    userId:userId,
                }
            })

            // if cart is not exist create a new cart
            if(!cart){
                cart = await prisma.cart.create({
                    data:{
                        userId:userId,
                    }
                })
            }
            //check the cart have any item
            const existCartItem = await prisma.cartItem.findUnique({
                where:{
                   cartId_productId: {
                    cartId:cart.id,
                    productId:productId,
                   }
                },
            })

            let cartItem;

            //if the cartitem is not simmilar then add the new cart item

            if(existCartItem){
                const newQuantity = existCartItem.quantity + quantity;

                if(newQuantity > product.stock){
                    throw new apiError(400,"Product is out of stock")
                }

                cartItem = await prisma.cartItem.update({
                    where:{
                        id:existCartItem.id,
                    },
                    data:{
                        quantity:newQuantity,
                    }
                })
            }
            //if the cartitem is simmilar then update the qantity
            else {
                cartItem = await prisma.cartItem.create({
                    data:{
                        cartId:cart.id,
                        productId:productId,
                        quantity:quantity,
                    }
                })
            }  
            //return the cart
            return cartItem
        }catch(error){
            throw new apiError(400, "problem in add to cart")
        }
    }
    
    async getUserCart(userId: string) {
        try {
            let cart = await prisma.cart.findUnique({
                where: {
                    userId: userId,
                },
                include: {
                    items: {
                        include: {
                            product: {
                                include: {
                                    images: true // to show image in cart UI
                                }
                            }
                        }
                    }
                }
            });

            if (!cart) {
                cart = await prisma.cart.create({
                    data: {
                        userId: userId,
                    },
                    include: {
                        items: {
                            include: {
                                product: {
                                    include: {
                                        images: true
                                    }
                                }
                            }
                        }
                    }
                });
            }

            return cart;
        } catch (error) {
            throw new apiError(400, "Problem fetching user cart");
        }
    }

    async updateCartItemQuantity(userId: string, productId: string, quantity: number) {
        try {
            const cart = await prisma.cart.findUnique({
                where: { userId }
            });

            if (!cart) {
                throw new apiError(404, "Cart not found");
            }

            const existCartItem = await prisma.cartItem.findUnique({
                where: {
                    cartId_productId: {
                        cartId: cart.id,
                        productId: productId,
                    }
                }
            });

            if (!existCartItem) {
                throw new apiError(404, "Item not found in cart");
            }

            if (quantity <= 0) {
                // Delete item from cart if quantity is 0 or less
                await prisma.cartItem.delete({
                    where: { id: existCartItem.id }
                });
                return { message: "Item removed from cart" };
            }

            const product = await prisma.product.findUnique({
                where: { id: productId }
            });

            if (!product || product.stock < quantity) {
                throw new apiError(400, "Product is out of stock or insufficient quantity");
            }

            const updatedCartItem = await prisma.cartItem.update({
                where: { id: existCartItem.id },
                data: { quantity }
            });

            return updatedCartItem;
        } catch (error) {
            throw new apiError(400, "Problem updating cart item");
        }
    }
}

export const cartService = new CartService()