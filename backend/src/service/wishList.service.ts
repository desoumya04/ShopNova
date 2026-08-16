import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';


class WishlistService {
  toggleWishlist = async (userId: string, productId: string) => {
    return await prisma.$transaction(async (tx) => {
      // 1. Check product
      const product = await tx.product.findUnique({
        where: {
          id: productId,
        },
        select: {
          id: true,
          status: true,
        },
      });

      if (!product) {
        throw new apiError(404, "Product not found");
      }

      // Don't allow archived/deleted products
      if (
        product.status === "ARCHIVED" ||
        product.status === "DELETED"
      ) {
        throw new apiError(
          400,
          "This product is no longer available"
        );
      }

      // 2. Find user's wishlist
      let wishlist = await tx.wishlist.findUnique({
        where: {
          userId,
        },
        select: {
          id: true,
        },
      });

      // 3. Create wishlist if it doesn't exist
      if (!wishlist) {
        wishlist = await tx.wishlist.create({
          data: {
            userId,
          },
          select: {
            id: true,
          },
        });
      }

      // 4. Check if product is already in wishlist
      const existingItem = await tx.wishlistItem.findUnique({
        where: {
          wishlistId_productId: {
            wishlistId: wishlist.id,
            productId,
          },
        },
      });

      // 5. Remove if already exists
      if (existingItem) {
        await tx.wishlistItem.delete({
          where: {
            id: existingItem.id,
          },
        });

        return existingItem
      }

      // 6. Otherwise add it
      const wishlistItem = await tx.wishlistItem.create({
        data: {
          wishlistId: wishlist.id,
          productId,
        },
        select: {
          id: true,
          wishlistId: true,
          productId: true,
          addedAt: true,
        },
      });

      return wishlistItem
    });
  };


  getUserWishList = async(userId : string) =>{
    return await prisma.$transaction(async (tx) => {
      // 1. Find user's wishlist
      let wishlist = await tx.wishlist.findUnique({
        where: {
          userId,
        },include:{
            items:{
                include:{
                    product:{
                        include:{
                            images:true,
                            variants:true
                        }
                    }
                }
            }
        }   
      });

      if(!wishlist){
        throw new apiError(404,"wishlist is empty")
      }
      return wishlist
    });
  } 
}

export const wishlistService = new WishlistService();