import * as dotenv from "dotenv";
dotenv.config();
import { Tigris } from "@tigrisdata/core";
import { User } from "./models/user";
import { Event } from "./models/event";

async function main() {
  console.log("Creating database collections...");
  const tigrisClient = new Tigris();
  await tigrisClient.registerSchemas([User, Event]);
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
