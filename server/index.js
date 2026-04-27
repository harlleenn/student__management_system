const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "harleenkaurkukreja@1201",
  database: "student_db",
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      // console.log("where is the")
      return;
    }
    res.json(results);
  });
});
// POST - add new student
app.post("/students", (req, res) => {
  const { name, email, course } = req.body; // req.body destructed req.body.name as being sent by newStudent
  db.query(
    "INSERT INTO students (name, course, email) VALUES (?, ?, ?)",
    [name, course, email],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ message: "Student added", id: results.insertId });
    },
  );
});

app.delete("/students/:id", (req, res) => {
  db.query(
    "DELETE FROM students WHERE id =?",
    [req.params.id],
    (err, results) => {
      // req.params.id becuase only id in url being sent
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ message: "Student has been deleted successfully" });
    },
  );
});

app.put("/students/:id", (req, res) => {
  const studentId = req.params.id;
  const { name, email, course } = req.body;
  console.log("params:", req.params);
  console.log("body:", req.body);
    db.query(
    "UPDATE students SET name = ?, email = ?, course = ? WHERE id = ?",
    [name, email, course, studentId],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Student updated successfully", id: studentId });
    }
  );
});


db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
    return;
  }
  console.log("MySQL connected");
});

app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
