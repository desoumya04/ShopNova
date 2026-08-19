import jwt from 'jsonwebtoken';
import { apiError } from './apiError.js';
import bcrypt from 'bcrypt';

interface JwtPayload {
  id: string;
  email: string;
  
}

class jwtProvider {
  private secretKey: string;
  
  
  constructor(secretKey: string) {
    this.secretKey = secretKey;
   
  }

  createToken(data: JwtPayload ) {
    return jwt.sign(data, this.secretKey, { expiresIn:"48h" } as jwt.SignOptions);
  }

  verifyToken(token: string){
    try {
     
      const decoded: JwtPayload = jwt.verify(token, this.secretKey) as JwtPayload;
      
      return decoded;
    } catch (error) {
      throw new apiError(401, 'Invalid or expired token');
      
    }
  }

  cookieOptions(){
    const isProduction = process.env.NODE_ENV === 'production';
    return {
      httpOnly: true,
      secure: isProduction,
      sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
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