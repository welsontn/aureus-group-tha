import slugify from "slugify";
import { randomBytes, randomInt } from "crypto";

const RANDOM_INT_MIN = 10000 // for slug
const RANDOM_INT_MAX = 999999

const generateHashFn = (length: number) => randomBytes(length).toString('hex')

const utils = {
	/**
	 * Generate random string using crypto (1 length = 2 chars)
	 * @param length of generated string
	 * @returns generated secured random string
	 */
	generateHash: (length: number): string => {
		const result = generateHashFn(length)
		return result;
	},

	/**
	 * Generate slug based on input
	 * @param input 
	 * @returns slug with UID
	 */
	slugify: (input: string): string => {
		let result = slugify(input, {
			lower: true,
			strict: true,
		})

		//append additional number to avoid collision of same input
		result += "-" + randomInt(RANDOM_INT_MIN, RANDOM_INT_MAX)
		return result;
	},

	errorCheck: (error:any): string => {
	    let msg: string = "Unknown error";
	    if (typeof error === "string") {
	      msg = error;
	    } else if (error instanceof Error) {
	      msg = error.message;
	    }
		return msg;
	}
};

export = utils;