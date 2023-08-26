import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { accessTokenSchema } from "#src/schemas/accessToken";
import userService from "#src/services/userService";

const userAppliedJobs = asyncHandler( async (req: Request, res: Response, next: NextFunction)  => {
  const decoded = accessTokenSchema.parse(req.body.decoded)
  
  // Get User's applied jobs
  const jobDTOs = await userService.getAppliedJobs(decoded.id)

  res.status(200).json(jobDTOs)
})


export default userAppliedJobs;