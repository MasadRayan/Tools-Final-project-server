import { client } from "../config/db";

export const productCollection = client.db("buy-nest").collection("products")