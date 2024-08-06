const { MongoClient, ServerApiVersion } = require("mongodb");

const static = require("./static");

const uri = static.MONGO_DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDb = async () => {
  // Connect the client to the server	(optional starting in v4.7)
  await client.connect();

  return client;
};

const disconnectDb = async () => {
  await client.close();
};

module.exports = {
  connectDb,
  disconnectDb,
};
