// routes/students.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all students
router.get('/', (req, res) => {
  db.all('SELECT * FROM students', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add/update student
router.post('/', (req, res) => {
  const { student_id, name, email } = req.body;
  db.run(`
    INSERT INTO students (student_id, name, email)
    VALUES (?, ?, ?)
    ON CONFLICT(student_id) DO UPDATE SET name = excluded.name, email = excluded.email
  `, [student_id, name, email], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Delete student
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM students WHERE student_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
