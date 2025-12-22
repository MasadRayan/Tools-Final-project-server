import { client } from "../config/db.js";

export const sslPaymentCollection = client.db("buy-nest").collection("sslPayments");