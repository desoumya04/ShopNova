
import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import type { Prisma } from '../generated/prisma/client.js';
import bcrypt from 'bcrypt';






class SellerService {

  async register(userId:string,sellerData: {
    seller: { password: string };
    sellerAddress: Prisma.UserAddressCreateWithoutUserInput;
    business: Prisma.BusinessCreateWithoutSellerInput;
    businessAddress: Prisma.BusinessAddressCreateWithoutBusinessInput;
    bank: Prisma.BankCreateWithoutSellerInput;
  }) {

    const{seller,sellerAddress,business,businessAddress,bank} = sellerData

    const hashPassword = await bcrypt.hash(seller.password,10);
    
    // create a new seller and store it in data base
    const newSeller = await prisma.$transaction(async (tx) => {

      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          role: 'SELLER',
        },
      })

      await tx.userAddress.create({
        data: {
          locality: sellerAddress.locality,
          pinCode: Number(sellerAddress.pinCode),
          state: sellerAddress.state,
          address: sellerAddress.address,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })
      // create a seller
      const createSeller = await tx.seller.create({
        data: {
          password: hashPassword,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      })

      // create a business
      const createBusiness = await tx.business.create({
        data: {
          name: business.name,
          email: business.email,
          mobile: business.mobile,
          gstIn: business.gstIn,
          category: business.category,
          seller: {
            connect: {
              id: createSeller.id,
            },
          },
        },
      })
      // create a business address
      await tx.businessAddress.create({
        data: {
          locality: businessAddress.locality,
          pinCode: Number(businessAddress.pinCode),
          state: businessAddress.state,
          address: businessAddress.address,
          business: {
            connect: {
              id: createBusiness.id,
            },
          },
        },
      })

      // create a bank details
      await tx.bank.create({
        data: {
          bankName: bank.bankName,
          accountHolder: bank.accountHolder,
          accountNumber: bank.accountNumber,
          ifcCode: bank.ifcCode,
          seller: {
            connect: {
              id: createSeller.id,
            },
          },
        },
      })

      return createSeller;
    })
    console.log("newSeller", newSeller)
    return { newSeller };

  }

  async sellerLogin(loginData: any) {
    const email = loginData.email;
    const hasMissingField = [email].some(v => !v);
    const existingSeller = await prisma.user.findUnique({
      where: { email: email }
    })
    if (!existingSeller) {
      throw new apiError(404, 'Seller not found');
    }

    // check for missing fields
    if (hasMissingField) {
      throw new apiError(400, 'Missing required fields: email');
    }

    return { existingSeller };
  }

  async getSeller(token: string) {

  }

}
export const sellerService = new SellerService();