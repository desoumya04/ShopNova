import jwt from 'jsonwebtoken';
import { apiError } from './apiError.js';
import bcrypt from 'bcrypt';

class jwtProvider {
  private secretKey: string;
  
  
  constructor(secretKey: string) {
    this.secretKey = secretKey;
   
  }

  createToken(data: object): string {
    return jwt.sign(data, this.secretKey, { expiresIn:"24h" } as jwt.SignOptions);
  }

  verifyToken(token: string){
    try {
      console.log('Verifying token:', token);
      const decoded = jwt.verify(token, this.secretKey);
      console.log(decoded);
      return decoded;
    } catch (error) {
      throw new apiError(401, 'Invalid or expired token');
      
    }
  }

  cookieOptions(){
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    };
  }

  async decodeHash(hashValue: string, hashKey: string){
    try {
      const value = await bcrypt.compare(hashKey, hashValue);
      return value;
    } catch (error) {
      throw new apiError(400, 'Failed to decode token');
    }

  }
}
export const JWTProviderInstance = new jwtProvider(process.env.JWT_SECRET!);