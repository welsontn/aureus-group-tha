import path from 'path';

// use .env for sensitive information instead of storing here directly; this is default config for development
export const MONGO_HOST = process.env.MONGO_HOST || "mongo"
export const MONGO_PORT = process.env.MONGO_PORT || "27017"
export const MONGO_USER = process.env.MONGO_USER || "nodeuser"
export const MONGO_PASS = process.env.MONGO_PASS || "1537074ec8c9448d8fe0b88ea"
export const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "aureus-tha"
export const MONGO_CONN_STRING= "mongodb://" + MONGO_USER + ":" + MONGO_PASS + "@" + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_DB_NAME
