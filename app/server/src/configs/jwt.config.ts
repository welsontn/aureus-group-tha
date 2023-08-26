import path from 'path';

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "b40993a9a8d592812f067a2f4209796c837f5f2e93d29f88fc7e78fc8d0f2250"
// currently there's only Access Token. There is no Refresh Token
export const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || "15m"
