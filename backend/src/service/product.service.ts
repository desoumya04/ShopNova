import { prisma } from "../config/db.js";
import { apiError } from "../utils/apiError.js";

import uploadImage, { deleteCloudinaryImage } from "../config/cloudinary.js";



interface productPayload {
  products: {
    name: string;
    description: string;
    categoryId: string;
    brand: string;
    status: "DRAFT" | " ACTIVE" | "LOW_STOCK";
    price: string;
    discountPrice?: string;
    costPrice?: string;
    stock: string;

  };
  productVariants: {
    color?: string;
    size?: string;
    storage?: string;
    ram?: string;

    weight: string;
    warranty: string;
  };

}
interface prodImage {
  url: string;
  publicId: string;
}

class productService {
  // Create a new product
  async createProduct(userId: string, productData: any, files: any) {

    const existingSeller = await prisma.seller.findUnique({
      where: { userId: userId },
    });

    if (!existingSeller) {
      throw new apiError(404, "seller not found");
    }
    const sellerId = existingSeller.id;
    const products = JSON.parse(productData.product);
    const productVariants = JSON.parse(productData.productVariants);
    // Assuming the seller is authenticated and their ID is available in req.user

    const imageFiles = files||[];

    const imagePromises = imageFiles.map((file:any)=>uploadImage(file.path))
    const uploadedImages = await Promise.all(imagePromises)
      
    const imageUrl:prodImage[] = uploadedImages.map((res)=>({url:res.data.url,publicId:res.data.publicId}))
      


    // Create the product in the database

    const newProduct = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          name: products.name,
          description: products.description,
          brand: products.brand,
          status: products.status || "DRAFT",
          price: Number(products.price),
          discountPrice: Number(products.discountPrice),
          costPrice: Number(products.costPrice),
          stock: Number(products.stock),
          seller: {
            connect: { id: sellerId },
          },
          category: {
            connect: { id: products.categoryId },
          },
          inventory: {
            create: {
              quantity: Number(products.stock),
              reserved: 0
            }
          }
        },
      });
      await tx.productVariant.create({
        data: {
          color: productVariants.color,
          size: productVariants.size,
          storage: productVariants.storage,
          ram: productVariants.ram,
          weight: Number(productVariants.weight),
          warranty: productVariants.warranty,
          product: {
            connect: { id: product.id },
          },
        },
      });

      if(imageUrl.length > 0){
        await tx.productImage.createMany({
          data: imageUrl.map((image)=>({
            productId:product.id,
            url:image.url,
            publicId:image.publicId,  
          }))
            
        })
      }

    });

    return newProduct;
  }

  async sellerProductDetails(userId: string) {
    if (!userId) {
      throw new apiError(401, "user is not authorized")
    }
    const existSeller = await prisma.seller.findUnique({
      where: {
        userId: userId
      }

    })
    if (!existSeller) {
      throw new apiError(404, "seller not found")
    }
    const products = await prisma.product.findMany({
      where: {
        sellerId: existSeller.id
      },
      include: {
        category: true,
        variants: true,
        images: true,
      },
    });


    return products

  } 

  async fetchCategoryWishProduct(category: any) {

    if (!category) {
      throw new apiError(404, "category is not selected")
    }
    const categoryMap: Record<string, string> = {
      electronics: "Electronics",
      fashion: "Fashion",
      books: "Books",
      grocery: "Grocery",
      beauty: "Beauty",
      sports: "Sports",
      toys: "Toys",
      home_appliances: "Home Appliances"
    };

    const categoryName = categoryMap[category.trim().toLowerCase()];


    const categoryData = await prisma.category.findUnique({
      where: { name: categoryName },
      include: {
        products: {
          where: {
            status: {
              in: ["ACTIVE", "LOW_STOCK"],
            },
          },
          include: {
            images: true,
            variants: true
          }
        }
      }
    })
    return categoryData
  }



  async getProductByProductId(productId: string) {
    if (!productId) {
      throw new apiError(404, "productId is not given"
      )
    }

    const productDetails = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        variants: true,
        inventory: true
      }
    })



    if (!productDetails) {
      throw new apiError(404, "productId is not valid")
    }

    return { images: productDetails.images, variants: productDetails.variants, product: productDetails }

  }

  async updateProduct(userId: string, productId: string, productData: any, files: any) {

    // featch the seller and prodct in parallel 
    const [existingSeller, existingProduct] = await Promise.all([
      prisma.seller.findUnique({ where: { userId } }),
      prisma.product.findUnique({ where: { id: productId }, include: { variants: true, images: true } }),
    ])

    if (!existingSeller) {
      throw new apiError(404, "seller not found");
    }

    if (!existingProduct) {
      throw new apiError(404, "Product not found");
    }

    if (existingProduct.sellerId !== existingSeller.id) {
      throw new apiError(403, "You do not have permission to edit this product");
    }

    const products = typeof productData.product === 'string' ? JSON.parse(productData.product) : productData.product;
    const productVariants = typeof productData.productVariants === 'string' ? JSON.parse(productData.productVariants) : productData.productVariants;
    const deleteImageIds = typeof productData.deletedImages === 'string' ? JSON.parse(productData.deletedImages) : productData.deletedImages;


    // 1. Upload new images to Cloudinary using promise.all

    const uploadPromises = (files || []).map((file: any) => uploadImage(file.path))
    const uploadResults = await Promise.all(uploadPromises)
    const uploadedImages = uploadResults.map((res) => ({
      url: res.data.url,
      publicId: res.data.publicId
    }))

    // 2. Fetch images to delete BEFORE the transaction
    let deletedImagesFromDB: any[] = [];
    if (deleteImageIds && deleteImageIds.length > 0) {
      deletedImagesFromDB = await prisma.productImage.findMany({
        where: { id: { in: deleteImageIds } },
      });
    }

    const transactionResult = await prisma.$transaction(async (tx) => {
      //update product and inventory simultaneously using array
      const updatedProduct = await Promise.all([
        tx.product.update({
          where: { id: productId },
          data: {
            name: products.name,
            description: products.description,
            brand: products.brand,
            status: products.status,
            price: Number(products.price),
            discountPrice: Number(products.discountPrice),
            costPrice: Number(products.costPrice),
            stock: Number(products.stock),
            categoryId: products.categoryId,
          },
        }),
        tx.inventory.update({
          where: { productId },
          data: {
            quantity: Number(products.stock),

          },
        }),

      ])
      if(productVariants){
      if (existingProduct.variants && existingProduct.variants.length > 0) {
        await tx.productVariant.update({
          where: { id: existingProduct.variants[0].id },
          data: {
            color: productVariants.color,
            size: productVariants.size,
            storage: productVariants.storage,
            ram: productVariants.ram,
            weight: Number(productVariants.weight),
            warranty: productVariants.warranty,
          },
        });
      }
    }
      // deleted images from DB
      if (deleteImageIds && deleteImageIds.length > 0) {
        await tx.productImage.deleteMany({
          where: { id: { in: deleteImageIds } },
        });
      }

      //bulk inserting new images to DB
      if (uploadedImages.length > 0) {
        await tx.productImage.createMany({
          data: uploadedImages.map((image: any) => ({
            productId,
            url: image.url,
            publicId: image.publicId
          })),
        })
      }

      return updatedProduct;
    });

    // 3. Delete images from Cloudinary AFTER transaction succeeds
    if (deletedImagesFromDB.length > 0) {
      
          try {
            await Promise.all(
              deletedImagesFromDB.map((image: any) => deleteCloudinaryImage(image.publicId))
            )
            return transactionResult;
            
          } catch (error) {
            throw new apiError(500, "failed to delete image")
          }
        
      }
    

    return transactionResult;
  }

  async getCategory() {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async archiveProduct(userId: string, productId: string) {
    const existingSeller = await prisma.seller.findUnique({
      where: { userId },
    });

    if (!existingSeller) {
      throw new apiError(404, "Seller not found");
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      throw new apiError(404, "Product not found");
    }

    if (existingProduct.sellerId !== existingSeller.id) {
      throw new apiError(403, "You do not have permission to archive this product");
    }

    const archivedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        status: "ARCHIVED"
      }
    });

    return archivedProduct;
  }

}

export const productServiceInstance = new productService();
