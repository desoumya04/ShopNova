import {prisma} from "../config/db.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import uploadImage from "../config/cloudinary.js";
import { AnyCnameRecord } from "node:dns";
import { JWTProviderInstance } from "../utils/jwtProvider.js";

interface ProductImage {
  url: string;
}

interface productPayload {
  products: {
    name:string
    slug?:string
    description:string
    brand:string
    status: "DRAFT"|" ACTIVE" |"LOW_STOCK"
  }
  productVariants:{
    color?:string
    size?:string
    storage?:string
    ram?:string
    price:string
    discountPrice?:string
    costPrice?:string
    stock:string
    weight:string
    warranty:string
  }
  category:{
    name:string
    
  }
  productImages: ProductImage[]
}

class productService {
  // Create a new product
  async createProduct(jwt:string,productData:productPayload,file:any) {
      const decode = JWTProviderInstance.verifyToken(jwt)
      if(!decode){
        throw new apiError(401,"user is not a valid authorization")
      }
      const existingSeller = await prisma.seller.findUnique({
        where:{ userId: decode.id}
      })
      if(!existingSeller){
        throw new apiError(404,"seller not found")
      }
      const sellerId = existingSeller.id;
      const { products, productVariants, productImages,category } = productData;
      // Assuming the seller is authenticated and their ID is available in req.user
      
     let imageUrl = null
      
      if (file) {
        const uploadResult = await uploadImage(file.path);
        imageUrl = uploadResult.data.url;
      }

      // Create the product in the database


      const newProduct = await prisma.$transaction(async(tx) => {
        const product = await tx.product.create({
          data: {
            name: products.name,
            slug: products.slug,
            description: products.description,
            brand: products.brand,
            status: products.status || "DRAFT",
            seller: {
              connect: { id: sellerId },
            },
            category:{
              connect:{name : category.name}
            }
          },
        })
        await tx.productVariant.create({
          data: {
            color: productVariants.color,
            size: productVariants.size,
            storage: productVariants.storage,
            ram: productVariants.ram,
            price: Number(productVariants.price),
            discountPrice:Number(productVariants.discountPrice),
            costPrice: Number(productVariants.costPrice),
            stock: Number(productVariants.stock),
            weight: Number(productVariants.weight),
            warranty: productVariants.warranty,
            product: {
              connect: { id: product.id },
            },
          },
        })
        if (imageUrl) {
          await tx.productImage.create({
            data: {
              url: imageUrl,
              product: {
                connect: { id: product.id },
              },
            },
          });
        } 
      })
      return newProduct;
   
  }

  async getCategory(){
    const categories = await prisma.category.findMany();
    return categories;
  }
}

export const productServiceInstance = new productService();