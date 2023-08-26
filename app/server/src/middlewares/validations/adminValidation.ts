import { roleEnum } from "#src/enums/roleEnum";
import { accessTokenSchema } from "#src/schemas/accessToken";
import { jobDTOSchema } from "#src/schemas/jobDTO";
import userService from "#src/services/userService";
import ErrorResponse from "#src/utils/errorResponse";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { z } from "zod";

const adminValidation = {
    adminOnly: asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
        const decoded = accessTokenSchema.parse(req.body.decoded)
        
        // Get User
        const userDTO = await userService.getById(decoded.id)

        if (userDTO){
            if (userDTO.role == roleEnum.Values.admin){
                // admin only
                next();
            } else {
                throw new ErrorResponse(403, "Forbidden")
            }
        } else {
            throw new ErrorResponse(401, "Unauthorized")
        }
    }),

    createJob: asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
        const file = req.file
        const body = req.body
        let parsed;
        try {
            parsed = JSON.parse(body.json)
        } catch (e){
            throw new ErrorResponse(422, "Malformed json format")
        }

        // posted based on when the job is posted
        // override admin's postedAt input
        parsed.postedAt = new Date() 

        // add file path if there is
        if (file){
            parsed.imagePath = file.path;
        }
        
        // Validate job content
        const job = jobDTOSchema.parse(parsed)

        // attach parsed job
        req.body.job = job

        next()
    }),


    deleteJob: asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
        const params = req.params

        // validate id
        z.string().parse(params.id)

        next()
    }),

}



export default adminValidation