import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import { JWTProviderInstance } from '../utils/jwtProvider.js';
import { EmailServiceInstance } from '../utils/sendEmail.js';



class authService{
  async login (loginData: any){
    const { email } = loginData;
    const hasMissingField = [email].some(v => !v);
    // check for missing fields
    if(hasMissingField){
      throw new apiError(400, 'Missing required fields: email');
    }
    const existingSeller = await prisma.seller.findUnique({
      where:{ email: loginData.email}
    })    
    if(!existingSeller){
      throw new apiError(404, 'Seller not found');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await prisma.seller.update({
      where: { email: loginData.email },
      data: { otp: otp, otpExpiresAt: new Date(Date.now() + 2 * 60 * 1000) }, // OTP valid for 5 minutes
    })
    EmailServiceInstance.sendEmail(existingSeller.email, 'Your OTP Code', `Your OTP code is: ${otp}`);
    return otp;
  }
  // verify otp for signup and login
  async verifyOtp(otpData: any){
    const { email, otp } = otpData;
    const existingUser = await prisma.user.findUnique({
      where:{ email: email}
    })    
    if(!existingUser){
      throw new apiError(404, 'User not found');
    }
    if(existingUser.otp !== otp){
      throw new apiError(400, 'Invalid OTP');
    }
    if(existingUser.otpExpiresAt && existingUser.otpExpiresAt < new Date()){
      throw new apiError(400, 'OTP expired');
    }
    await prisma.user.update({
      where: { email: email },
      data: { otpVerified: true, otp: null, otpExpiresAt: null}, // Mark OTP as verified and clear it
    })
    const token = JWTProviderInstance.createToken({email: existingUser.email, id: existingUser.id});
    return { token };
  }

}

export const AuthService = new authService();