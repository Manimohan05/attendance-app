module.exports = (app, db) => {
    app.post('/mark-attendance', (req, res) => {
        const user_id = req.session.userId;
        const date = new Date().toISOString().slice(0, 10);  // YYYY-MM-DD
        const insert = `INSERT INTO attendance (user_id, date) VALUES (?, ?)`;
        db.run(insert, [user_id, date], (err) => {
            if (err) {
                res.status(500).send({success: false, message: "Failed to mark attendance"});
            } else {
                res.send({success: true});
            }
        });
    });

    app.get('/view-attendance', (req, res) => {
        const user_id = req.session.userId;
        const query = `SELECT date FROM attendance WHERE user_id = ? ORDER BY date DESC`;
        db.all(query, [user_id], (err, rows) => {
            if (err) {
                res.status(500).send({success: false, message: "Failed to retrieve records"});
            } else {
                res.send(rows);
            }
        });
    });
};
