import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jobService from "#src/services/jobService";

const adminGetJobs = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  // get jobs
  const jobs = await jobService.getAll({ description: 0})
  
  res.status(200).json(jobs)
})


export default adminGetJobs;