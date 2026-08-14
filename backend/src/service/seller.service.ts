
import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import type { Prisma } from '../generated/prisma/client.js';

class SellerService{

async register(sellerData: {
  seller: Prisma.UserCreateInput;
  sellerAddress: Prisma.UserAddressCreateWithoutUserInput;
  business: Prisma.BusinessCreateWithoutSellerInput;
  businessAddress: Prisma.BusinessAddressCreateWithoutBusinessInput;
  bank: Prisma.BankCreateWithoutSellerInput;
}){
    
const {seller,sellerAddress,business,businessAddress,bank} = sellerData;
    console.log('sellerData:', sellerData.seller,sellerData.sellerAddress,sellerData.business,sellerData.businessAddress,sellerData.bank);
    
    const existingSeller = await prisma.user.findUnique({
      where:{ email: seller.email}
    })
    // check if seller with the same email already exists
    if(!existingSeller){
      throw new apiError(400, 'Seller with this email is not exists');
    }
    
    // create a new seller and store it in data base


    const newSeller = await prisma.$transaction(async(tx) =>{

      // 
      await tx.user.update({
        where:{ 
          id: existingSeller.id,
        },
        data:{
          name: seller.name,
          mobile: seller.mobile,
          role: 'SELLER',
        } ,
      })

      await tx.userAddress.create({
        data:{
          locality: sellerAddress.locality,
          pinCode: Number(sellerAddress.pinCode),
          state: sellerAddress.state,
          address: sellerAddress.address,
        user:{
          connect:{
            id: existingSeller.id,
          },
        },
      }, 
      })
      // create a seller
      const createSeller = await tx.seller.create({
        data:{
          user:{
            connect:{
              id: existingSeller.id,
            },
          },
        },
      })

      // create a business
      const createBusiness = await tx.business.create({
        data:{
          name: business.name,
          email: business.email,
          mobile: business.mobile,
          gstIn: business.gstIn,
          category: business.category,
          seller:{
            connect:{
              id: createSeller.id,
            },
          },
        },
      })
      console.log("business",business)
      // create a business address
      await tx.businessAddress.create({
        data:{
          locality: businessAddress.locality,
          pinCode: Number(businessAddress.pinCode),
          state: businessAddress.state,
          address: businessAddress.address,
          business:{
            connect:{
              id: createBusiness.id,
            },
          },
        },
      })

      // create a bank details
      await tx.bank.create({
        data:{
          bankName: bank.bankName,
          accountHolder: bank.accountHolder,
          accountNumber: bank.accountNumber,
          ifcCode: bank.ifcCode,
          seller:{
            connect:{
              id: createSeller.id,
            },
          },
        },
      })
    })

    
    return { newSeller };

  }

  async sellerLogin(loginData: any){
    const email = loginData.email;
    const hasMissingField = [email].some(v => !v);
    const existingSeller = await prisma.user.findUnique({
      where:{ email: email}
    })    
    if(!existingSeller){
      throw new apiError(404, 'Seller not found');
    }
    
    // check for missing fields
    if(hasMissingField){
      throw new apiError(400, 'Missing required fields: email');
    }
    
    return {existingSeller};
  }

  async getSeller(token: string){
   
  } 
 
}
export const sellerService = new SellerService();