import { roleEnum } from "./enums/roleEnum";
import { userDTOSchema } from "#src/schemas/userDTO";
import userService from "#src/services/userService";


import dbClient from '#src/services/dbClient';
import utils from "./utils/utils";
import { logger } from "./services/logger";
import ErrorResponse from "./utils/errorResponse";

require('dotenv').config();

// instantiate user prompt
const read = require("read");

// Connect DB and then populate
console.log("connecting...");
dbClient.connect().then(async () => {

  console.log("Connected!");

  // create user
  try {
    // Input
    const adminUser = userDTOSchema.parse({
      firstName: await read({ prompt: "First Name: ", default: 'First' }),
      lastName: await read({ prompt: "Last Name: ", default: 'Last' }),
      email: await read({ prompt: "Email: ", default: 'admin@example.com' }),
      password: await read({ prompt: "Password (password): ", default: "password", silent: true }),
      role: roleEnum.Values.admin,
    })
    console.log("\n");

    // Create user
    await userService.createUser(adminUser)
    console.log("Done!")
  } catch (e) {
    if (e instanceof ErrorResponse){
      logger.error(e.message);
    } else {
      logger.error("Unknown error when creating admin user")
      console.log("Failed to create admin.")
    }
  } finally {
    dbClient.close()
    process.exit()
  }
}, 
  () => { console.log("Failed to connect Database")}
);

