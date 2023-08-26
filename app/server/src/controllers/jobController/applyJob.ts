import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jobService from "#src/services/jobService";
import userService from "#src/services/userService";
import ErrorResponse from "#src/utils/errorResponse";

const applyJob = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params
  const body = req.body
  const user_id = body.decoded.id

  // apply job by slug
  await userService.applyJobBySlug(user_id, params.slug)

  res.sendStatus(200)
})


export default applyJob;