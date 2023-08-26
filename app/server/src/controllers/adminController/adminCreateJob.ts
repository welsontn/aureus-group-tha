import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jobService from "#src/services/jobService";

const adminCreateJob = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const job = body.job

  // add job
  await jobService.createJob(job)
  
  res.sendStatus(200)
})


export default adminCreateJob;