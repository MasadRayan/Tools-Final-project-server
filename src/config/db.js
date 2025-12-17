import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MongoDB_URI

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅✅ Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error("DB Conenction Failed",e);
  }
}
