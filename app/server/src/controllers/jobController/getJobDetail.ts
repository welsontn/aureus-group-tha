import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jobService from "#src/services/jobService";

const getJobDetail = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params

  const job = await jobService.getBySlug(params.slug)

  res.status(200).json(job)
})


export default getJobDetail;