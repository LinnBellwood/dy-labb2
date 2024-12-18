const express = require("express");
const sqlite3 = require("sqlite3").verbose(); //impor sqlite3
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
    console.error("misslyckad anslutning", err.message);
  } else {
    console.log("Ansluten");
  }
});
//get-route som svarar med output när roten av servern besöks(5)
//server.get("/", (req, res) => {
//    res.send('Första get-route');
//});

//get-route för users(6) endpoint, req=förfrågan och res=svaret
server.get("/users", (req, res) => {
  //tom
  const sqlQuery = "SELECT * FROM users";

  db.all(sqlQuery, [], (err, rows) => {
    if (err) {
      console.error("Misslyckad hämtning", err.message);
      res.status(500).send({ error: "error" });
    } else {
      res.send(rows);
    }
  });
});

//listen=servern lyssnar på porten (3000)
const PORT = 3000;
server.listen(PORT, () => {
  console.log("server körs http://localhost:${PORT}");
});
//test att den fungerar
server.get("/", (req, res) => {
  res.send("Fungerar!");
});
