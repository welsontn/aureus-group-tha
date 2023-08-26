import errorResponse from "#src/utils/errorResponse";
import { logger } from "#src/services/logger";
import { NextFunction, Request, Response } from "express"
import { MongoServerError } from "mongodb";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

const errorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {

  // Zod validation error
  if (err instanceof ZodError){
    const validationError = fromZodError(err);
    return res.status(400).send(validationError.details);
  }

  // Response error to be sent to end users
  if (err instanceof errorResponse){
    return res.status(err.code).send(err.message)
  }
 
  //all catch error
  if (process.env.NODE_ENV == 'production'){
    if (err instanceof Error){
      logger.error(err.message);
    } else {
      //unknown error type
      logger.error(err);
    }
  } else {
    if (err instanceof Error){
      console.log(err.message)
    } else {
      //unknown error type
      console.log(err)
    }
  }
  return res.status(500).send("Unexpected Error")
}

export = errorHandler;