import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("Health is Good");
});

app.get("/question", (req, res) => {
  const q = "SELECT * FROM bzr1y9jplzahkedywbh7.qa";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/question/:id", (req, res) => {
  const quesid = req.params.id;
  const q = "SELECT * FROM bzr1y9jplzahkedywbh7.qa WHERE id = ?";
  db.query(q, [quesid], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/question", (req, res) => {
  const q =
    "INSERT INTO `bzr1y9jplzahkedywbh7`.`qa` (`question`, `answer`) VALUES (?)";
  const values = [req.body.question, req.body.answer];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ question: req.body.question, answer: req.body.answer });
  });
});

app.delete("/question/:id", (req, res) => {
  const quesid = req.params.id;
  const q = "DELETE FROM `bzr1y9jplzahkedywbh7`.`qa` WHERE id = ?";

  db.query(q, [quesid], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted sucessfully");
  });
});

app.put("/question/:id", (req, res) => {
  const quesid = req.params.id;
  const q =
    "UPDATE bzr1y9jplzahkedywbh7.qa SET `question` = ?, `answer` = ? WHERE id = ?";

  const values = [req.body.question, req.body.answer];

  db.query(q, [...values, quesid], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated sucessfully");
  });
});

app.delete("/questions", (req, res) => {
  const quesIds = req.body.data;
  const query = "DELETE FROM `bzr1y9jplzahkedywbh7`.`qa` WHERE id IN (?)";
  if (quesIds.length == 0) {
    return res.status(400).json("No ids to be deleted!!");
  }
  db.query(query, [quesIds], (err, data) => {
    if (err) return res.json(err);
    return res.json("Books has been deleted sucessfully");
  });
});

app.listen(8080, () => {
  console.log("Listening to backend");
});

//bzr1y9jplzahkedywbh7
