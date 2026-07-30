import { AuthService } from "../service/auth.service.js";
import { userService } from "../service/user.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { JWTProviderInstance } from "../utils/jwtProvider.js";



class UserController {

  createUser = asyncHandler(async (req,res) =>{
    const user = await userService.createUser(req.body);
    
  res
  .status(201)
  .cookie('token',user, JWTProviderInstance.cookieOptions())
  .json(
    new apiResponse(201,user,'User created successfully')
  )

  })

}

export const userController = new UserController();