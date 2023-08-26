import bcrypt from 'bcrypt';
const saltRounds = 10;

// password utility
const passwordUtil = {
	/**
	 * Using bcrypt to hash
	 * @param password
	 * @returns hashed password
	 */
	hash: async (input: string): Promise<string> => {
		const result: string = await bcrypt.hash(input, saltRounds);
		return result;
	},

	/**
	 * Using bcrypt to compare password
	 * @param input password to check
	 * @param hashed password 
	 * @returns true if match
	 */
	compare: async (input: string, hash: string): Promise<boolean> => {
		const result: boolean = await bcrypt.compare(input, hash);
		return result;
	},

	/**
	 * Fake compare to prevent timing attack
	 * @param input password
	 */
	fakeCompare: async (input: string) => {
		await bcrypt.compare(input, "$2a$10$r2jB.5e8JrKGpz82t5BrSOVwRHfgTvZKQs2JTEJr3NWSKzCBYv7ky");
	}
};

export = passwordUtil;