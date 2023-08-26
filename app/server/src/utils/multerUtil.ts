
import multer, { FileFilterCallback } from 'multer';
import fs from 'fs/promises';
import * as projectConfig from '#src/project.config'
import { randomBytes } from 'crypto';
import ErrorResponse from './errorResponse';
import { Request } from 'express';
import utils from './utils';
import path from 'path';

const IMAGE_JOB_PATH = projectConfig.IMAGE_JOB_PATH
const IMAGE_MAX_SIZE = projectConfig.IMAGE_MAX_SIZE

// image filter
const IMAGE_FILTER = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
	const filetypes = /jpeg|jpg|png/;
	const mimecorrect = filetypes.test(file.mimetype);
	// note that mime-type can be faked
	if (mimecorrect){
		return cb(null, true)
	} 
	return cb(new ErrorResponse(422, "Only jpqg, jpg and png are allowed"));
}

const multerUtil = {
	/**
	 * instantiate multer with storage and validation
	 * @returns multer with job image storage
	 */
	uploadJobImage: () => {
		// storage and destination
		var storage = multer.diskStorage({
			destination: async function (req: Request, file: Express.Multer.File, cb) {
				const path = IMAGE_JOB_PATH;
				await fs.mkdir(path, { recursive: true })
					cb(null, path)
			},
			filename: function (req: Request, file: Express.Multer.File, cb) {
				// rename file with UID prefix
				// edge case filename collision detection not implemented
				cb(null, utils.generateHash(8) + "-" + file.originalname)
			}
		})

		// instantiate multer with above setting
		return multer({
			storage: storage,
			limits: { fileSize: IMAGE_MAX_SIZE},
			fileFilter: IMAGE_FILTER,
		})
	}
};

export = multerUtil;