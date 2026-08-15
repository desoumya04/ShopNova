import { Request, Response, NextFunction } from 'express';
import { apiError } from '../utils/apiError.js';
import { JWTProviderInstance } from '../utils/jwtProvider.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Extend the Express Request type to include the user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  const token =
    req.cookies?.token ||
    (authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined);

  if (!token) {
    throw new apiError(401, 'Unauthorized: No token provided');
  }

  // Verify token
  const decoded = JWTProviderInstance.verifyToken(token);
  if (!decoded) {
    throw new apiError(401, 'Invalid token');
  }

  // Attach decoded token data (like id, email) to the request object
  req.user = decoded;
  
  next();
});
