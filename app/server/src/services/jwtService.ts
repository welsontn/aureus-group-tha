import jwt from 'jsonwebtoken'
import * as jwtConfig from "#src/configs/jwt.config";
import { accessTokenSchema } from '#src/schemas/accessToken';

const SECRET_KEY = jwtConfig.JWT_SECRET_KEY;
const ACCESS_EXPIRES_IN = jwtConfig.JWT_ACCESS_EXPIRES_IN;

const jwtService = {

    generateAccessToken: (id: string):string => {
        const tokenSchema = accessTokenSchema.parse({ id: id })
        const token = jwt.sign(tokenSchema, SECRET_KEY, { expiresIn: ACCESS_EXPIRES_IN })
        return token;
    },
    verifyToken: (token: string) => {
        // Remove auth type
        token = token.replace(/^Bearer\s+/, "");
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded;
    },

}


export default jwtService;