import { Tigris, DB } from "@tigrisdata/core";

const tigrisClient = new Tigris();
const tigrisDB: DB = tigrisClient.getDatabase();

export default tigrisDB;
