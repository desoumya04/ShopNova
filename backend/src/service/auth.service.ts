import { prisma } from '../config/db.js';
import { apiError } from '../utils/apiError.js';
import { JWTProviderInstance } from '../utils/jwtProvider.js';
import { EmailServiceInstance } from '../utils/sendEmail.js';

interface otpData{
  email:string,
  otp:string
}


class authService{
  
  // verify otp for signup and login
  async verifyOtp(otpData: otpData){
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
    return { jwt: token, role: existingUser.role,name: existingUser.name, email: existingUser.email };
  }

}

export const AuthService = new authService();