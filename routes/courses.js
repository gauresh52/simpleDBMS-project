// routes/courses.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all courses
router.get('/', (req, res) => {
  db.all('SELECT * FROM courses', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add/update course
router.post('/', (req, res) => {
  const { course_id, course_name, instructor } = req.body;
  db.run(`
    INSERT INTO courses (course_id, course_name, instructor)
    VALUES (?, ?, ?)
    ON CONFLICT(course_id) DO UPDATE SET course_name = excluded.course_name, instructor = excluded.instructor
  `, [course_id, course_name, instructor], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Delete course
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM courses WHERE course_id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
