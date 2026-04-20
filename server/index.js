const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'harleenkaurkukreja@1201',
  database: 'student_db'
})

app.get('/students', (req, res) => {
  db.query('SELECT * FROM students', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message })
      console.log("where is the")
      return
    }
    res.json(results)
  })
})
// POST - add new student
app.post('/students', (req, res) => {
  const { name, course, email } = req.body
  db.query('INSERT INTO students (name, course, email) VALUES (?, ?, ?)', 
  [name, course, email], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Student added', id: results.insertId })
  })
})

// PUT - update student
// app.put('/students/:id', (req, res) => {
//   const { name, course, email, age } = req.body
//   db.query('UPDATE students SET name=?, course=?, email=?,  WHERE id=?',
//   [name, course, email, req.params.id], (err) => {
//     if (err) {
//       res.status(500).json({ error: err.message })
//       return
//     }
//     res.json({ message: 'Student updated' })
//   })
// })

// // DELETE - delete student
// app.delete('/students/:id', (req, res) => {
//   db.query('DELETE FROM students WHERE id=?', [req.params.id], (err) => {
//     if (err) {
//       res.status(500).json({ error: err.message })
//       return
//     }
//     res.json({ message: 'Student deleted' })
//   })
// })

db.connect((err) => {
  if (err) {
    console.log('DB connection failed:', err)
    return
  }
  console.log('MySQL connected')
})

app.listen(3000, () => {
  console.log(`server is running on port 3000`)
})
