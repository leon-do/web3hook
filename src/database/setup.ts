import * as dotenv from "dotenv";
dotenv.config();
import { Tigris } from "@tigrisdata/core";
import { User } from "./models/user";
import { Trigger } from "./models/trigger";

/*
 * This script is used to create the database collections
 * The models are defined in the `src/database/models` folder
 * It is run by the `npm run database`
 * */
async function main() {
  console.log("Creating database collections...");
  const tigrisClient = new Tigris();
  await tigrisClient.registerSchemas([User, Trigger]);
}

main()
  .then(async () => {
    console.log("Setup complete!");
    process.exit(0);
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
