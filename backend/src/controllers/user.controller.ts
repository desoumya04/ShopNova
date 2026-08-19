import { AuthService } from "../service/auth.service.js";
import { Request, Response } from "express";
import { userService } from "../service/user.service.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { JWTProviderInstance } from "../utils/jwtProvider.js";
import { loginSchema, signUpSchema } from "../schema/auth.schema.js";



class UserController {

  signUp = asyncHandler(async (req: Request, res: Response) => {
    const safeParse = signUpSchema.safeParse(req.body)
    if (!safeParse.success) {
      throw new apiError(400, 'Invalid request body')
    }
    const user = await userService.signUp(safeParse.data);

    res
      .status(201)
      .cookie('token', user, JWTProviderInstance.cookieOptions())
      .json(
        new apiResponse(201, user, 'User created successfully')
      )

  })

  userLogin = asyncHandler(async (req, res) => {
    const safeParse = loginSchema.safeParse(req.body)
    if (!safeParse.success) {
      throw new apiError(400, 'Invalid request body')
    }
    const result = await userService.userLogin(safeParse.data);

    // If the login response contains a JWT (e.g. direct login without OTP), set it as a cookie
    if (result && typeof result === 'object' && 'jwt' in result) {
      const { jwt, ...rest } = result as any;
      res
        .status(200)
        .cookie('token', jwt, JWTProviderInstance.cookieOptions())
        .json(
          new apiResponse(200, rest, 'login successfully')
        );
    } else {
      res
        .status(200)
        .json(
          new apiResponse(200, result, 'login successfully')
        );
    }

  })

  userDetails = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new apiError(401, 'Unauthorized: User ID missing');
    }
    const userDetails = await userService.userDetails(userId);
    res.status(200).json(new apiResponse(200, userDetails, 'User details fetched successfully'));
  })


  updateUser = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new apiError(401, 'Unauthorized: User ID missing');
    }

    const userDetails = await userService.updateUser(userId, req.body);
    res.status(200).json(new apiResponse(200, userDetails, 'User details updated successfully'));
  })

  fetchUserAddresss = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new apiError(401, 'Unauthorized: User ID missing');
    }
    const userAddress = await userService.fetchUserAdresss(userId);
    res.status(200).json(new apiResponse(200, userAddress, 'User Adresss fetched successfully'));
  })

  addNewAddress = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new apiError(401, 'Unauthorized: User ID missing');
    }
    const userAddress = await userService.addNewAress(userId, req.body);
    res.status(200).json(new apiResponse(200, userAddress, 'User Adresss fetched successfully'));
  })
}

export const userController = new UserController();