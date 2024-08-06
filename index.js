const express = require("express");
const path = require("path");

const connector = require("./src/common");

const app = express();
const port = 3000;

app.use(express.static("client/build"));

app.get("/requests", async (req, res) => {
  try {
    const client = await connector.connectDb();
    // Send a ping to confirm a successful connection
    const certsDb = await client.db("certifications");
    const requests = certsDb.collection("requests");

    // Query for a movie that has the title 'Back to the Future'
    const query = { id: req.query.id };
    const requestResult = await requests.findOne(query);

    res.json(requestResult);
  } catch (e) {
    res.send(e);
  } finally {
    // Ensures that the client will close when you finish/error
    connector.disconnectDb();
  }
});

app.post("/requests", async (req, res) => {
  try {
    const client = await connector.connectDb();
    // Send a ping to confirm a successful connection
    const certsDb = await client.db("certifications");
    const requests = certsDb.collection("requests");

    // Query for a movie that has the title 'Back to the Future'
    await requests.insertOne(req.body);

    res.json({
      status: 200,
      message: "Inserted",
    });
  } catch (e) {
    res.send(e);
  } finally {
    // Ensures that the client will close when you finish/error
    connector.disconnectDb();
  }
});

// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the routeconst
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
