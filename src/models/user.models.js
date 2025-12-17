import { client } from "../config/db";

export const userCollection = client.db("buy-nest").collection("users"); 