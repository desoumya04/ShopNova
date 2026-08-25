import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import bcrypt from 'bcrypt';
import { JWTProviderInstance } from '../utils/jwtProvider.js';
import { EmailServiceInstance } from '../utils/sendEmail.js';
import { loginDataType, signUpDataType } from '../schema/auth.schema.js';



class UserService {
  // create a new user
  async signUp(userData: signUpDataType) {


    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    })

    // check if user with the same email already exists
    if (existingUser) {
      throw new apiError(400, 'User with this email already exists');
    }

    const hashPassword = await bcrypt.hash(userData.password, 12);

    // send a otp

    // create a new user and store it in data base
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        mobile: userData.mobile,
        email: userData.email,
        password: hashPassword,
        // OTP valid for 5 minutes
      },
    })

    //send otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.user.update({
      where: { email: userData.email },
      data: { otp: otp, otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000) }, // OTP valid for 5 minutes
    })
    EmailServiceInstance.sendEmail(newUser.email, 'Your OTP Code', `Your OTP code is: ${otp}`);

    // Only return the nessary details to client not full user deatils
    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      mobile: newUser.mobile,
      otp:otp
    };

  }
  async userLogin(loginData: loginDataType) {



    const existingUser = await prisma.user.findUnique({
      where: { email: loginData.email }
    })
    if (!existingUser) {
      throw new apiError(404, 'User not found');
    }
    const passwordMatch = await bcrypt.compare(loginData.password, existingUser.password)
    if (!passwordMatch) {
      throw new apiError(401, 'Invalid password');
    }
    const token = JWTProviderInstance.createToken({ email: existingUser.email, id: existingUser.id });
    return { email: existingUser.email, name: existingUser.name, jwt: token };
  }

  async userDetails(userId: string) {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })
    if (!existingUser) {
      throw new apiError(404, 'User not found');
    }
    return { name: existingUser.name, email: existingUser.email, mobile: existingUser.mobile, role: existingUser.role, joined: existingUser.createdAt };
  }


  async updateUser(userId: string, userData: any) {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    })
  
    if (!existingUser) {
      throw new apiError(404, 'User not found');
    }
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: userData.name || existingUser.name,
        mobile: userData.phone || existingUser.mobile,
      },
    })
    return { name: updatedUser.name, phone: updatedUser.mobile, joined: updatedUser.createdAt };
  }


  async fetchUserAdresss(userId:string){
    const existingUser = await prisma.user.findUnique({
      where: { id: userId } 
    })
    if (!existingUser) {
      throw new apiError(404, 'User not found');
    }
    const updatedUser = await prisma.userAddress.findMany({
      where: { userId: userId },
    })
    return updatedUser;
  }

  async addNewAress(userId:string, addressData:any){
    const existingUser = await prisma.user.findUnique({
      where: { id: userId } 
    })
    if (!existingUser) {
      throw new apiError(404, 'User not found');
    }
    const updatedUser = await prisma.userAddress.create({
      data: {
       user:{
        connect:{id:userId}
       },
        address: addressData.address,
        locality  : addressData.locality,
        state: addressData.state,
        pinCode: addressData.pinCode,
       
      },
    })
    return updatedUser;
  }
}



export const userService = new UserService();