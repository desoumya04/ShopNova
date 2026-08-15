import { AuthService } from "../service/auth.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { JWTProviderInstance } from "../utils/jwtProvider.js";



class AuthController {


  verifyOtp = asyncHandler(async (req,res) =>{
      const result = await AuthService.verifyOtp(req.body);
      const { jwt, ...rest } = result;

      res
      .status(200)
      .cookie('token', jwt, JWTProviderInstance.cookieOptions())
      .json(
        new apiResponse(200, rest, 'OTP verified successfully')
      );
  })

  checkAuth = asyncHandler(async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
      throw new apiError(401, 'Not authenticated');
    }

    const decoded = JWTProviderInstance.verifyToken(token);
    res.status(200).json(
      new apiResponse(200, { authenticated: true, email: decoded.email, id: decoded.id }, 'Authenticated')
    );
  })

  logout = asyncHandler(async (_req, res) => {
    res
      .status(200)
      .clearCookie('token', JWTProviderInstance.cookieOptions())
      .json(
        new apiResponse(200, null, 'Logged out successfully')
      );
  })
}

export const authController = new AuthController();