import "dotenv/config";
import * as express from "express";
import { Request, Response } from "express";
import * as path from "path";

import { connector } from "./src/common";

const app = express();
const port = 3000;

app.use(express.static("client/build"));

app.get(
  "/request/:id",
  (req: Request, res: Response, next) => {
    // perform some operation
    // may be authentication / authorization
    console.log("ID:", req.query.id);
    next();
  },
  async (req: Request, res: Response) => {
    try {
      const client = await connector.connectDb();
      // Send a ping to confirm a successful connection
      const certsDb = await client.db("certifications");
      const requests = certsDb.collection("requests");

      // Query for a movie that has the title 'Back to the Future'
      const query = { id: req.params.id };
      const requestResult = await requests.find(query).limit(5).skip(0);

      res.json(requestResult);
    } catch (e) {
      res.send(e);
    } finally {
      // Ensures that the client will close when you finish/error
      connector.disconnectDb();
    }
  },
);

app.get("/requests", async (req: Request, res: Response) => {
  try {
    const client = await connector.connectDb();
    // Send a ping to confirm a successful connection
    const certsDb = await client.db("certifications");
    const requests = certsDb.collection("requests");

    const requestResult = await requests.find().limit(5).skip(0);

    res.json(requestResult);
  } catch (e) {
    res.send(e);
  } finally {
    // Ensures that the client will close when you finish/error
    connector.disconnectDb();
  }
});

app.post("/requests", async (req: Request, res: Response) => {
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
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
