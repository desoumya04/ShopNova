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

  userLogin = asyncHandler(async (req,res) =>{
    
    const user = await userService.userLogin(req.body);
    res
    .status(200)
    .json(
      new apiResponse(200,user,'OTP sent successfully')
    )

  })

  userDetails = asyncHandler(async (req,res) =>{
    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader)
  const token =
    (authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : undefined);
    
    if(!token){
      throw new apiError(401, 'Unauthorized: No token provided');
    }
    console.log("token:" ,token)
    const userDetails = await userService.userDetails(token);
    res.status(200).json(new apiResponse(200,userDetails,'User details fetched successfully'));
  })


  updateUser = asyncHandler(async (req,res) =>{
    const authHeader = req.headers.authorization;

    const token =
      req.cookies.token ||
      (authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined);
    
    if(!token){
      throw new apiError(401, 'Unauthorized: No token provided');
    }

    const userDetails = await userService.updateUser(token,req.body);
    res.status(200).json(new apiResponse(200,userDetails,'User details updated successfully'));
  })
}

export const userController = new UserController();