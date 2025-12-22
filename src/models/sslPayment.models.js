import { client } from "../config/db";

export const sslPaymentCollection = client.db("buy-nest").collection("sslPayments");