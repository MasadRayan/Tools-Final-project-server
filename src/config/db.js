import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error("MongoDB URI is not defined");
}

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectDB() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    // console.log("✅✅ Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error("DB Conenction Failed",e);
  }
}
