import { client } from "../config/db.js";

export const ordersCollection = client.db("buy-nest").collection("orders");