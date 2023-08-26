import path from 'path';

// this config has to be located at root directory for ROOT_DIR to point correctly
// Project & node configuration
export const ROOT_DIR = __dirname; //project root directory
export const NODE_PORT = process.env.NODE_PORT || "8888"; // this node app port
export const NODE_HOST = process.env.NODE_HOST || "http://localhost"; // this node app url
export const URL_PORT = NODE_PORT; // same as NODE_PORT
export const URL_PATH = NODE_HOST; // same as NODE_HOST
export const API_PATH = "/api/v1";  // this node app api url
export const OPENAPI_YAML = path.join(ROOT_DIR, 'openapi.yaml'); // where's swagger/openapi spec located
export const FULL_PATH = `${URL_PATH}:${URL_PORT}/${API_PATH}`; // full url path for API
export const PROJECT_DIR = __dirname; //project root directory (same as ROOT_DIR for now)
export const IMAGE_JOB_PATH = 'uploads/images/jobs';  //Uploaded files location (do not use absolute path)
export const IMAGE_MAX_SIZE = 2 * 1024 * 1024;  // 2MB

