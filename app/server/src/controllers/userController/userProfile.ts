import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userService from "#src/services/userService";
import { roleEnum } from "#src/enums/roleEnum";
import { accessTokenSchema } from "#src/schemas/accessToken";
import ErrorResponse from "#src/utils/errorResponse";
import { UserDTO } from "#src/schemas/userDTO";

const userProfile = asyncHandler( async (req: Request, res: Response, next: NextFunction)  => {
  const decoded = accessTokenSchema.parse(req.body.decoded)
  
  // Get User's profile
  const userDTO = await userService.getById(decoded.id)

  if (!userDTO){
    // if user not found, return error
    throw new ErrorResponse(401, "Unauthorized")
  }

  res.status(200).json(userDTO)
})


export default userProfile;