const express = require("express");

const connector = require("./src/common");

const app = express();
const port = 3000;

app.use(express.static("client/build"));

app.get("/", async (req, res) => {
  try {
    const client = await connector.connectDb();
    // Send a ping to confirm a successful connection
    const certsDb = await client.db("certifications");
    const requests = certsDb.collection("requests");

    // Query for a movie that has the title 'Back to the Future'
    const query = { id: req.query.id };
    const requestResult = await requests.findOne(query);

    res.send(requestResult);
  } catch (e) {
    res.send(e);
  } finally {
    // Ensures that the client will close when you finish/error
    connector.disconnectDb();
  }
});

app.post("/", async (req, res) => {
  try {
    const client = await connector.connectDb();
    // Send a ping to confirm a successful connection
    const certsDb = await client.db("certifications");
    const requests = certsDb.collection("requests");

    // Query for a movie that has the title 'Back to the Future'
    await requests.insertOne(req.body);

    res.send("Inserted");
  } catch (e) {
    res.send(e);
  } finally {
    // Ensures that the client will close when you finish/error
    connector.disconnectDb();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
