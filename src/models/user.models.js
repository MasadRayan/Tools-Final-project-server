import { client } from "../config/db.js";

export const userCollection = client.db("buy-nest").collection("users"); 