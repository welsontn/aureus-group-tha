import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userService from "#src/services/userService";
import { roleEnum } from "#src/enums/roleEnum";

const userRegister = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;

  // Add to database (Service do another validation)
  await userService.createUser({...body})

  // OK
  res.sendStatus(200)
})


export default userRegister;