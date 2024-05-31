const { MongoClient } = require("mongodb");
const url =
  "mongodb+srv://Hadi:flipflopz@investmint.tqki2ef.mongodb.net/?retryWrites=true&w=majority&appName=InvestMint";
const dbName = "yourDatabaseName";

MongoClient.connect(url, function (err, client) {
  if (err) {
    console.error("Connection error:", err);
    return;
  }
  console.log("Connected successfully to database");
  const db = client.db(dbName);

  db.collection("transactions").deleteMany({}, function (err, result) {
    if (err) {
      console.error("Delete operation error:", err);
      return;
    }
    console.log(result.deletedCount + " document(s) deleted");
    client.close();
  });
});
