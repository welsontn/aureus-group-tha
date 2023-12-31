import { roleEnum } from "#src/enums/roleEnum";
import { userDTOSchema } from "#src/schemas/userDTO";
import { accessTokenSchema } from "#src/schemas/accessToken";
import ErrorResponse from "#src/utils/errorResponse";
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import userService from "#src/services/userService";
import { passwordSchema } from "#src/schemas/passwordSchema";
import { z } from "zod";

const userValidation = {

    userOnly: asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
        const decoded = accessTokenSchema.parse(req.body.decoded)
        
        // Get User
        const userDTO = await userService.getById(decoded.id)

        if (userDTO){
            if (userDTO.role == roleEnum.Values.user){
                // user only
                next();
            } else {
                throw new ErrorResponse(403, "Forbidden")
            }
        } else {
            throw new ErrorResponse(401, "Unauthorized")
        }
    }),
    
    register: asyncHandler( async (req: Request, res: Response, next: NextFunction) => {

        // validate user input
        userDTOSchema.omit({role: true})
                     .strict()
                     .parse(req.body)

        // Always create user with "user" role when registering
        req.body.role = roleEnum.Values.user

        next();
    }),

    login: asyncHandler( async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;

        // validate email & password
        req.body.email = userDTOSchema.shape.email.parse(body.email)
        req.body.password = passwordSchema.parse(body.password)

        // Attach 'user' role when login
        req.body.role = roleEnum.Values.user

        next();
    }),

}



export default userValidation