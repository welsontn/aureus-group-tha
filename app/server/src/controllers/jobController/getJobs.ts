import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jobService from "#src/services/jobService";

const getJobs = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const jobs = await jobService.getAllActive({ description: 0})

  res.status(200).json(jobs)
})


export default getJobs;