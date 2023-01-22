import { Tigris } from "@tigrisdata/core";
import { User } from "./models/user";
import { Event } from "./models/event";

const tigrisClient = new Tigris();
const database = tigrisClient.getDatabase();
const userDatabase = database.getCollection<User>(User);
const eventDatabase = database.getCollection<Event>(Event);

export { userDatabase, eventDatabase };
