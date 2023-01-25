import * as dotenv from "dotenv";
dotenv.config();
import tigrisDb from "./tigris";
import { User } from "./models/user";

/*
 * This file is used to test the database queries
 * To run this file, run the following command:
 *   npm run test:database
 */

(async () => {
  // get collection
  const userDatabase = tigrisDb.getCollection<User>(User);

  // Delete User
  const deleteOneResponse = await userDatabase.deleteOne({
    filter: { userId: "myUserId" },
  });
  console.log("\nDelete User", deleteOneResponse);

  // Insert User
  const insertOneResponse = await userDatabase.insertOne({
    userId: "myUserId",
    apiKey: "123",
    paid: false,
    created: Date.now(), 
  } as User);
  console.log("\nInsert One User", insertOneResponse);

  // Update User
  const updateOneResponse = await userDatabase.updateOne({
    filter: {
      userId: "myUserId",
    },
    fields: {
      paid: true,
    },
  });
  console.log("\nUpdating User", updateOneResponse);

  // Find Users
  const findManyResponse = await userDatabase.findMany({
    filter: {
      userId: "myUserId",
    },
  });
  console.log("\nSelect Many Users", await findManyResponse.toArray());
})();

export {};
