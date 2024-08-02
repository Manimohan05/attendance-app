const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) console.error(err.message);
});

// Endpoint to mark attendance
router.post('/mark-attendance', (req, res) => {
    const { userId, status } = req.body;  // Assuming 'status' might be something like "Present"
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
    const sql = 'INSERT INTO attendance (user_id, date, status) VALUES (?, ?, ?)';
    db.run(sql, [userId, date, status], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send('Attendance marked successfully');
    });
});

// Endpoint to view attendance
router.get('/view-attendance', (req, res) => {
    const sql = 'SELECT * FROM attendance';
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.json(rows);
    });
});

module.exports = router;
