import { client } from "../config/db.js";

export const productCollection = client.db("buy-nest").collection("products")