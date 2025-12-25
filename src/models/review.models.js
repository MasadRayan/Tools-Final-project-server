import { client } from "../config/db.js";

export const reviewCollection = client.db("buy-nest").collection("reviews");