const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const mysql = require('mysql2');
const session = require("express-session");

app.use(session({
  secret: "your secret key here",
  resave: false,
  saveUninitialized: true
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'USER',
  password: 'PASS',
  database: 'DATABASE'
});
const users = [];

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const { username, password,email } = req.body;
  const sql = "SELECT * FROM login_info WHERE username = ? AND password = ?";
  connection.query(sql, [username, password,email], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      // User is authenticated, create a session
      req.session.user = {
        id: results[0].id,
        username: results[0].username,
        email: results[0].email,
      };
      res.send("Login successful");
    } else {
      // Invalid credentials
      res.send("Invalid username or password");
    }
  });
});


app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;
  const sql = "INSERT INTO login_info (username, password, email) VALUES (?, ?, ?)";
  connection.query(sql, [username, password, email], (err, results) => {
    if (err) throw err;
    console.log("User added to database");
    res.send("User added to database");
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
