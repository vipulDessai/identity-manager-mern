import { connector } from "./src/common";

const insertPersons = async (client) => {
  const certsDb = await client.db("certifications");
  const personColl = certsDb.collection("persons");

  await personColl.deleteMany({});

  const personData = [
    {
      person_id: "6392529400",
      firstname: "Elise",
      lastname: "Smith",
      dateofbirth: new Date("1972-01-13T09:32:07Z"),
      vocation: "ENGINEER",
      address: {
        number: 5625,
        street: "Tipa Circle",
        city: "Wojzinmoj",
      },
    },
    {
      person_id: "1723338115",
      firstname: "Olive",
      lastname: "Ranieri",
      dateofbirth: new Date("1985-05-12T23:14:30Z"),
      gender: "FEMALE",
      vocation: "ENGINEER",
      address: {
        number: 9303,
        street: "Mele Circle",
        city: "Tobihbo",
      },
    },
    {
      person_id: "8732762874",
      firstname: "Toni",
      lastname: "Jones",
      dateofbirth: new Date("1991-11-23T16:53:56Z"),
      vocation: "POLITICIAN",
      address: {
        number: 1,
        street: "High Street",
        city: "Upper Abbeywoodington",
      },
    },
    {
      person_id: "7363629563",
      firstname: "Bert",
      lastname: "Gooding",
      dateofbirth: new Date("1941-04-07T22:11:52Z"),
      vocation: "FLORIST",
      address: {
        number: 13,
        street: "Upper Bold Road",
        city: "Redringtonville",
      },
    },
    {
      person_id: "1029648329",
      firstname: "Sophie",
      lastname: "Celements",
      dateofbirth: new Date("1959-07-06T17:35:45Z"),
      vocation: "ENGINEER",
      address: {
        number: 5,
        street: "Innings Close",
        city: "Basilbridge",
      },
    },
    {
      person_id: "7363626383",
      firstname: "Carl",
      lastname: "Simmons",
      dateofbirth: new Date("1998-12-26T13:13:55Z"),
      vocation: "ENGINEER",
      address: {
        number: 187,
        street: "Hillside Road",
        city: "Kenningford",
      },
    },
  ];

  const requestResult = await personColl.insertMany(personData);

  console.log(requestResult);
};

const getPersons = async (client) => {
  // Send a ping to confirm a successful connection
  const certsDb = await client.db("certifications");
  const personColl = certsDb.collection("persons");

  // Query for a movie that has the title 'Back to the Future'
  const query = { person_id: "6392529400" };
  const requestResult = await personColl.findOne(query);

  console.log(requestResult);
};

const pipePeople = async (client) => {
  const pipeline = [];
  pipeline.push({
    $match: {
      vocation: "ENGINEER",
    },
  });
  pipeline.push({
    $sort: {
      dateofbirth: -1,
    },
  });
  pipeline.push({
    $limit: 3,
  });
  pipeline.push({
    $unset: ["_id", "address"],
  });

  const certsDb = await client.db("certifications");
  const personColl = certsDb.collection("persons");
  const aggregationResult = await personColl.aggregate(pipeline);

  console.log(aggregationResult);
};

const run = async () => {
  try {
    const client = await connector.connectDb();

    // await insertPersons(client);
    // await getPersons(client);

    await pipePeople(client);
  } catch (e) {
    console.log(e);
  } finally {
    // Ensures that the client will close when you finish/error
    connector.disconnectDb();
  }
};

run();
