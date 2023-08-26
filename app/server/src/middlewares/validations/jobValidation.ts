
import { accessTokenSchema } from "#src/schemas/accessToken";
import { jobDTOSchema } from "#src/schemas/jobDTO";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

const jobValidation = {
    validateSlug: asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
        const params = req.params;

        // validate params
        jobDTOSchema.shape.slug.parse(params.slug)

        next();
    })
}



export default jobValidation