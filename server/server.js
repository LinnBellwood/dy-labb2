const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

const db = new sqlite3.Database("./gik339-labb2.db", (err) => {
  if (err) {
    console.error("Ajdå, anslutning misslyckad ", err.message);
  } else {
    console.log("Uppkopplad!");
  }
});

server.get("/users", (req, res) => {
  const sqlQuery = "SELECT * FROM users";

  db.all(sqlQuery, [], (err, rows) => {
    if (err) {
      console.error("Ajdå, hämtning misslyckad", err.message);
      res.status(500).send({ error: "error" });
    } else {
      res.send(rows);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("server körs http://localhost:${PORT}");
});

server.get("/", (req, res) => {
  res.send("Fungerar!");
});
