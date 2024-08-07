import { MongoClient, MongoClientOptions, ServerApiVersion } from "mongodb";

import { staticData } from "./static";

const uri = staticData.MONGO_DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
} as MongoClientOptions);

const connectDb = async () => {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();

  return client;
};

const disconnectDb = async () => {
  await client.close();
};

export const connector = {
  connectDb,
  disconnectDb,
};
