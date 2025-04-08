const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all enrollments (JOIN)
router.get('/', (req, res) => {
  const query = `
    SELECT s.student_id, s.name AS student_name,
           c.course_id, c.course_name
    FROM enrollments e
    JOIN students s ON e.student_id = s.student_id
    JOIN courses c ON e.course_id = c.course_id
    ORDER BY s.name
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new enrollment with TCL
router.post('/', (req, res) => {
  const { student_id, course_id } = req.body;

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    db.get("SELECT * FROM students WHERE student_id = ?", [student_id], (err, student) => {
      if (err || !student) {
        db.run("ROLLBACK");
        return res.status(400).json({ error: "Student not found" });
      }

      db.get("SELECT * FROM courses WHERE course_id = ?", [course_id], (err, course) => {
        if (err || !course) {
          db.run("ROLLBACK");
          return res.status(400).json({ error: "Course not found" });
        }

        db.run("INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)", [student_id, course_id], (err) => {
          if (err) {
            db.run("ROLLBACK");
            return res.status(500).json({ error: err.message });
          }

          db.run("COMMIT");
          res.json({ success: true });
        });
      });
    });
  });
});

// Delete enrollment
router.delete('/', (req, res) => {
  const { student_id, course_id } = req.query;
  db.run(`
    DELETE FROM enrollments WHERE student_id = ? AND course_id = ?
  `, [student_id, course_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router;
