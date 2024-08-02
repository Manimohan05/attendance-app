const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;; // You can change the port number if needed

// Database setup
const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        )`, (err) => {
            if (err) {
                console.error("Error creating users table", err.message);
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS attendance (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            date TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )`, (err) => {
            if (err) {
                console.error("Error creating attendance table", err.message);
            }
        });
    }
});

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'verysecret123',
    resave: false,
    saveUninitialized: false
}));

// Routes for authentication
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) { // Check for unique constraint failure
                res.status(409).send({
                    success: false,
                    message: "You registered already! Please login.",
                    userExists: true  // Additional flag to indicate existing user
                });
            } else {
                res.status(500).send({ success: false, message: "An error occurred during registration" });
            }
        } else {
            res.send({ success: true, message: "User registered successfully" });
        }
    });
});



app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err) {
            res.status(500).send({ success: false, message: "An error occurred" });
        } else if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user.id;  // Setting the user session on successful login
            res.send({ success: true, message: "Logged in successfully" });
        } else {
            res.status(401).send({ success: false, message: "Invalid username or password" });
        }
    });
});

// Forgot Password Route
app.post('/forgot', (req, res) => {
    const { username } = req.body;
    db.get(`SELECT password FROM users WHERE username = ?`, [username], (err, row) => {
        if (err) {
            res.status(500).send({ success: false, message: "Error retrieving password" });
        } else if (row) {
            res.send({ success: true, password: row.password }); // Note: Insecure practice
        } else {
            res.status(404).send({ success: false, message: "Username not found, please register" });
        }
    });
});

// Routes for attendance
app.post('/mark-attendance', (req, res) => {
    if (req.session.userId) {
        const user_id = req.session.userId;
        const date = new Date().toISOString().slice(0, 10);
        db.run(`INSERT INTO attendance (user_id, date) VALUES (?, ?)`, [user_id, date], function(err) {
            if (err) {
                res.status(500).send({ success: false, message: "Failed to mark attendance" });
            } else {
                res.send({ success: true, message: "Attendance marked successfully" });
            }
        });
    } else {
        res.status(403).send({ success: false, message: "Not logged in" });
    }
});

app.get('/view-attendance', (req, res) => {
    if (req.session.userId) {
        const user_id = req.session.userId;
        db.all(`SELECT users.username, attendance.date FROM attendance 
                JOIN users ON users.id = attendance.user_id 
                WHERE users.id = ? ORDER BY attendance.date DESC`, [user_id], (err, rows) => {
            if (err) {
                res.status(500).send({ success: false, message: "Failed to retrieve records" });
            } else {
                rows = rows.map(row => ({
                    date: row.date,
                    username: row.username,
                    message: "Attendance marked"
                }));
                res.send(rows);
            }
        });
    } else {
        res.status(403).send({ success: false, message: "Not logged in" });
    }
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });