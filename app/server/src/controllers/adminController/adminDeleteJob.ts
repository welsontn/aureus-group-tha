import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jobService from "#src/services/jobService";
import ErrorResponse from "#src/utils/errorResponse";

const adminDeleteJob = asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
  const params = req.params

  // Delete job
  const jobResult = await jobService.deleteById(params.id)
  if (!jobResult){
    throw new ErrorResponse(404, "Job not found or already deleted")
  }
  
  res.sendStatus(200)
})


export default adminDeleteJob;