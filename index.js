import express from "express";
import mysql from "mysql2";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.json("Health is Good");
});

app.get("/question", (req, res) => {
  const q = "SELECT * FROM question.qa";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/question", (req, res) => {
  const q =
    "INSERT INTO `question`.`qa` (`question`, `answer`, `hint`) VALUES (?)";
  const values = [req.body.question, req.body.answer, req.body.hint];
  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json({ question: req.body.question, answer: req.body.answer });
  });
});

app.delete("/question/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM `question`.`qa` WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted sucessfully");
  });
});

app.listen(8080, () => {
  console.log("Listening to backend");
});
