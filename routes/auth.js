const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/database.db', (err) => {
    if (err) console.error(err.message);
});

// Registration Endpoint
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(sql, [username, password], function(err) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.send(`User registered successfully with ID ${this.lastID}`);
    });
});

// Login Endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(sql, [username, password], (err, user) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        if (user) {
            res.send('Login successful');
        } else {
            res.status(404).send('User not found');
        }
    });
});

module.exports = router;
