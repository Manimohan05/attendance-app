module.exports = (app, db) => {
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        const query = `SELECT * FROM users WHERE username = ?`;
        db.get(query, [username], (err, user) => {
            if (err) {
                res.status(500).send({success: false, message: "An error occurred."});
            } else if (user && bcrypt.compareSync(password, user.password)) {
                req.session.userId = user.id;  // set user session
                res.send({success: true});
            } else {
                res.status(401).send({success: false, message: "Username or password incorrect"});
            }
        });
    });

    app.post('/register', (req, res) => {
        const { username, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);  // hash the password
        const insert = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.run(insert, [username, hashedPassword], (err) => {
            if (err) {
                res.status(500).send({success: false, message: "Username already exists"});
            } else {
                res.send({success: true});
            }
        });
    });
};
