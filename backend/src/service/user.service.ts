import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import bcrypt from 'bcrypt';
import { JWTProviderInstance } from '../utils/jwtProvider.js';
import { EmailServiceInstance } from '../utils/sendEmail.js';



class UserService{
// create a new user
  async createUser(userData: any){
    const  {name, mobile, email} = userData;
    console.log('userData:', userData);
    console.log("name:", name);
    console.log("mobile:", mobile);
    console.log("email:", email);

    const hasMissingField = [name, mobile, email].some(v => !v);
    // check for missing fields
    if(hasMissingField){
      throw new apiError(400, 'Missing required fields: name, mobile, email');
    }
    const existingUser = await prisma.user.findUnique({
      where:{ email: userData.email}
    })
  
    // check if user with the same email already exists
    if(existingUser){
      throw new apiError(400, 'User with this email already exists');
    }
    
    // send a otp
     
    // create a new user and store it in data base
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        mobile: userData.mobile,
        email: userData.email, 
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
    
    return { newUser };

  } 

  async userDetails(jwt: string){
    const decoded = JWTProviderInstance.verifyToken(jwt);
    if(!decoded){
      throw new apiError(401, 'Invalid token');
    }
    const existingUser = await prisma.user.findUnique({
      where:{ id: decoded.id}
    })    
    if(!existingUser){
      throw new apiError(404, 'User not found');
    } 
    return { name: existingUser.name, email: existingUser.email, phone: existingUser.mobile, joined: existingUser.createdAt};
  } 


  async updateUser(jwt: string, userData: any){
    const decoded = JWTProviderInstance.verifyToken(jwt);
    if(!decoded){
      throw new apiError(401, 'Invalid token');
    }
    const existingUser = await prisma.user.findUnique({
      where:{ id: decoded.id}
    })    
    console.log('existingUser:', existingUser);
    if(!existingUser){
      throw new apiError(404, 'User not found');
    } 
    const updatedUser = await prisma.user.update({
      where: { id: decoded.id },
      data: {
        name: userData.name || existingUser.name,
        mobile: userData.phone || existingUser.mobile,
      },
    })
    return { name: updatedUser.name, email: updatedUser.email,joined: updatedUser.createdAt};
  }
}



export const userService = new UserService();