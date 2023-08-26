import { NextFunction, Request, Response } from "express";
import jwtService from "#src/services/jwtService";
import { accessTokenSchema } from "#src/schemas/accessToken";

export const verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.body.token || req.query.token || req.headers['authorization'] || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Forbidden");
  }
  try {
    const decoded = jwtService.verifyToken(token)
    // validate decoded token
    const ats = accessTokenSchema.strict()
                                  .parse(decoded)
    req.body.decoded = ats
  } catch (err) {
    return res.status(401).send("Token has expired or invalid");
  }
  return next();
};