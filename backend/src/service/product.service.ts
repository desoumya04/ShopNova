import { prisma } from "../config/db.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import uploadImage from "../config/cloudinary.js";
import { AnyCnameRecord } from "node:dns";
import { JWTProviderInstance } from "../utils/jwtProvider.js";

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

class productService {
  // Create a new product
  async createProduct(jwt: string, productData: any, files: any) {
    const decode = JWTProviderInstance.verifyToken(jwt);
    if (!decode) {
      throw new apiError(401, "user is not a valid authorization");
    }
    
    const existingSeller = await prisma.seller.findUnique({
      where: { userId: decode.id },
    });
    console.log("Existing seller : ",existingSeller)
    if (!existingSeller) {
      throw new apiError(404, "seller not found");
    }
    const sellerId = existingSeller.id;
    const products = JSON.parse(productData.product);
    const productVariants = JSON.parse(productData.productVariants);
    // Assuming the seller is authenticated and their ID is available in req.user

    const imageUrl : string[]  = [];

    for (const file of files) {
      const uploadResult = await uploadImage(file.path);
      imageUrl.push(uploadResult.data.url);
    }

    // Create the product in the database
    console.log("category",products.categoryId)
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

      for(const [index,url] of imageUrl.entries())
        await tx.productImage.create({
          data: {
            url: url,
            product: {
              connect: { id: product.id },
            },
          },
        });
      
    });
    
    return newProduct;
  }

  async sellerProductDetails(jwt: string){
    if(!jwt){
      throw new apiError(401,"user is ot authorized")
    }
    const decode = JWTProviderInstance.verifyToken(jwt)
    
    if(!decode){
      throw new apiError(401,"user is ot authorized")
    }
    const existSeller = await prisma.seller.findUnique({
      where: {
        userId: decode.id
      }
      
    })
    if(!existSeller){
      throw new apiError(404,"seller not found")
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

  async fetchCategoryWishProduct(category:any){
   
    if(!category){
      throw new apiError(404,"category is not selected")
    }
    const categoryMap: Record<string, string> = {
    electronics: "Electronics",
    fashion: "Fashion",
    books: "Books",
    grocery: "Grocery",
    beauty: "Beauty",
    sports: "Sports",
    toys: "Toys",
  };

  const categoryName = categoryMap[category.trim().toLowerCase()];

  
    const categoryData  = await prisma.category.findUnique({
      where:{name: categoryName },
      include:{
        products:{
          include:{
            images:true
          }
        }
      }
    })
    return categoryData
  }



  async getProductByProductId(productId:string){
    if(!productId){
      throw new apiError(404,"productId is not given"
      )
    }

    const productDetails = await prisma.product.findUnique({
      where:{id:productId},
      include:{
        images:true,
        variants:true
      }
    })

    if(!productDetails){
      throw new apiError(404,"productId is not valid")
    }
    console.log(productDetails)
    return productDetails

  }




  async getCategory() {
    const categories = await prisma.category.findMany();
    return categories;
  }
}

export const productServiceInstance = new productService();
