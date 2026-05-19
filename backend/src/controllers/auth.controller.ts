import { AuthService } from "../service/auth.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { JWTProviderInstance } from "../utils/jwtProvider.js";




class AuthController {
 // login
  login = asyncHandler(async (req,res) =>{
    const login = await AuthService.login(req.body);
    res
    .status(200)
    .json(
      new apiResponse(200, login, 'Login successful')
    );
  })
  verifyOtp = asyncHandler(async (req,res) =>{
      const isOtpValid = await AuthService.verifyOtp(req.body);
      res
      .status(200)
      .json(
        new apiResponse(200, isOtpValid.token, 'OTP verified successfully')
      );
  })
}

export const authController = new AuthController();