import * as dotenv from "dotenv";
dotenv.config();
import { userDatabase } from "./index";
import { User } from "./models/user";

/*
 * This file is used to test the database queries
 * To run this file, run the following command:
 *   npm run test:database
 */

(async () => {
  // Delete User
  const deleteOneResponse = await userDatabase.deleteOne({
    filter: { userId: "testUserId01" },
  });
  console.log("\nDelete User", deleteOneResponse);

  // Insert User
  const insertOneResponse = await userDatabase.insertOne({
    userId: "testUserId01",
    apiKey: "testApiKey01",
    credits: 100,
  } as User);
  console.log("\nInsert One User", insertOneResponse);

  // Update User
  const updateOneResponse = await userDatabase.updateOne({
    filter: {
      userId: "testUserId01",
    },
    fields: {
      credits: 50,
    },
  });
  console.log("\nUpdating User", updateOneResponse);

  // Find Users
  const findManyResponse = await userDatabase.findMany({
    filter: {
      userId: "testUserId01",
    },
  });
  console.log("\nSelect Many Users", await findManyResponse.toArray());
})();

export {};
