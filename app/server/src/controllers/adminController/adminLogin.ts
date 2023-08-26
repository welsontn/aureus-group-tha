import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userService from "#src/services/userService";
import ErrorResponse from "#src/utils/errorResponse";
import { roleEnum } from "#src/enums/roleEnum";
import passwordUtil from "#src/utils/passwordUtil";
import jwtService from "#src/services/jwtService";
import {tokenResponseSchema} from "#src/schemas/tokenResponse";

const adminLogin = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  const userEmail: string = body.email;
  const userPassword: string = body.password;

  // Limit to 'admin' role only
  const userRole:string = roleEnum.Values.admin;

  // fetch user by email and role
  const userDTOPW = await userService.getByEmailAndRole(userEmail, userRole, true);

  // contain DTO if success, else null
  let token: string | undefined;
  if (userDTOPW && userDTOPW.password) {
    const matched:boolean = await passwordUtil.compare(userPassword, userDTOPW.password);
    // password matched
    if (matched){
      // generate token
      token = jwtService.generateAccessToken(userDTOPW.id as string);
    }
  } else {
    await passwordUtil.fakeCompare(userPassword);
  }

  // not generated means failed
  if (!token){
    throw new ErrorResponse(401, "User does not exist or wrong password");
  }
  
  const tokenRes = tokenResponseSchema.parse({status: 200, token: token})
  res.status(200).json(tokenRes)
})


export default adminLogin;