const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createPool({
  user: "sarik",
  host: "localhost",
  password: "sala54n4",
  database: "urheilija",
});

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM urheilijat";
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const {
    kasvattajanimi,
    kutsumanimi,
    syntymavuosi,
    paino,
    kuvalinkki,
    laji,
    saavutukset,
  } = req.body;
  const sqlInsert =
    "INSERT INTO urheilijat (kasvattajanimi, kutsumanimi, syntymavuosi, paino, kuvalinkki, laji, saavutukset) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [
      kasvattajanimi,
      kutsumanimi,
      syntymavuosi,
      paino,
      kuvalinkki,
      laji,
      saavutukset,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    }
  );
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM urheilijat WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM urheilijat WHERE id = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    kasvattajanimi,
    kutsumanimi,
    syntymavuosi,
    paino,
    kuvalinkki,
    laji,
    saavutukset,
  } = req.body;
  const sqlUpdate =
    "UPDATE urheilijat SET kasvattajanimi = ?, kutsumanimi = ?, syntymavuosi = ?, paino = ?, kuvalinkki = ?, laji = ?, saavutukset = ? WHERE  id = ?";
  db.query(
    sqlUpdate,
    [
      kasvattajanimi,
      kutsumanimi,
      syntymavuosi,
      paino,
      kuvalinkki,
      laji,
      saavutukset,
      id,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    }
  );
});

/*app.get("/", (req, res) => {
  const sqlInsert =
    "INSERT INTO urheilijat (kasvattajanimi, kutsumanimi, syntymavuosi, paino, kuvalinkki, laji, saavutukset) VALUES ('Ophis Eriberto', 'Eriberto', '2017', 5, 'https://tarumetsankennel.wordpress.com/eriberto/', 'Maastojuoksu', 'HVK MM 2019')";
  db.query(sqlInsert, (error, result) => {
    console.log("error", error);
    console.log("result", result);
    res.send("Hello express");
  });
});*/

app.listen(5000, () => {
  console.log("Serveri valmiina portissa 5000");
});
