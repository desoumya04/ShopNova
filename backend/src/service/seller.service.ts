
import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import bcrypt from 'bcrypt';
import { JWTProviderInstance } from '../utils/jwtProvider.js';


class SellerService{

  async createsSeller(sellerData: any){
    

    const  {name, mobile, email, password,gstIn} = sellerData;
    
    const hasMissingField = [name, mobile, email, password, gstIn].some(v => !v);
    // check for missing fields
    if(hasMissingField){
      throw new apiError(400, 'Missing required fields: name, mobile, email, password, gstIn');
    }
    const existingSeller = await prisma.seller.findUnique({
      where:{ email: sellerData.email}
    })
    // check if seller with the same email already exists
    if(existingSeller){
      throw new apiError(400, 'Seller with this email already exists');
    }
    
    // create a new seller and store it in data base
    const newSeller = await prisma.seller.create({
      data: {
        name: sellerData.name,
        mobile: sellerData.mobile,
        email: sellerData.email, 
        password: bcrypt.hashSync(sellerData.password, 10),
        role: sellerData.role || 'SELLER',
        gstIn: sellerData.gstIn,
      },
    })

    return { newSeller };

  }



  async getSeller(token: string){
   
  } 


// update seller
  async updateSellerProfile( existingSeller: any, updateData: any){
    const { name, mobile } = updateData
    const hasMissingField = [name, mobile].some(v => !v)
    // check for missing fields
    if(hasMissingField){
      throw new apiError(400, 'Missing required fields: name, mobile, password');
    }
    const updatedSeller = await prisma.seller.update({
      where: { id: existingSeller.id },
      data:{
        name,
        mobile,
      }
    })
    return updatedSeller;
  }
// update password 
  async updateSellerPassword(updatePassword:any){
    const{password,newPassword} = updatePassword
    const hasMissFiled = [password,newPassword].some(v=> !v)

    if(hasMissFiled){
      throw new apiError(400, 'Missing required fields: password, newPassword');
     }
    }
    
  
// delete seller
  async deleteSeller(Id: string){
    const deletedSeller = await prisma.seller.delete({
      where: { id: Id }
    })
    return deletedSeller;
  }


// added seller bank details

  async addBankDetails(bankData: any){
    const { bankName ,accountHolderName  ,accountNumber, ifcCode } = bankData.body;

    const hasMissingField = [accountHolderName, accountNumber, ifcCode, bankName].some(v => !v);
    // check for missing fields
    if(hasMissingField){
      throw new apiError(400, 'Missing required fields: , accountNumber, ifcCode, bankName');
    }


    // check the bank details is present or not 
      const existingBankDetails = await prisma.bank.findUnique({
        where: { accountNumber }
      })

      if(existingBankDetails){
        throw new apiError(400, 'Bank details with this account number already exists');
      }

    // verify token and get seller details
    const existingSeller = JWTProviderInstance.verifyToken(bankData.cookies.token);
    if(!existingSeller || typeof existingSeller === 'string'){
      throw new apiError(401, 'Unauthorized: Invalid token');
    }
    
    // create bank details and store it in database
    const bankDetails = await prisma.bank.create({
      data: {
       
          bankName,
          accountHolderName,
          accountNumber,
          ifcCode,
          seller: {
            connect: { email: existingSeller.email }
          }
      },
    })
    return bankDetails;
  }
  

// added business details
  async addBusinessDetails(businessData: any){
    const { businessName,businessEmail, businessPhone, locality, pinCode, state, address } = businessData.body;
    const hasMissingField = [businessName, businessEmail, businessPhone, locality, pinCode, state, address].some(v => !v);
    console.log(locality, pinCode, state, address);
    // check for missing fields
    if(hasMissingField){
      throw new apiError(400, 'Missing required fields: businessName, businessEmail, businessPhone, locality, pinCode, state, address');
    }

    // verify token and get seller details
    const existingSeller = JWTProviderInstance.verifyToken(businessData.cookies.token);
    if(!existingSeller || typeof existingSeller === 'string'){
      throw new apiError(401, 'Unauthorized: Invalid token');
    }
    
    // create business details and store it in database
    const businessDetails = await prisma.business.create({
      data: {
          name: businessName,
          email: businessEmail,
          phone: businessPhone,
          locality,
          pinCode,
          state,
          address,
          seller: {
            connect: { email: existingSeller.email }
          }
      },
    })
    return businessDetails;
  }

 
}
export const sellerService = new SellerService();