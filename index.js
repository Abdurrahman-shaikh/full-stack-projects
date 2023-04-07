const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
const users = [];

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/signup', (req, res) => {
    res.send(`
      <html>
        <head>
          <title>Sign Up</title>
        </head>
        <body>
          <h1>Sign Up</h1>
          <form method="post" action="/signup">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username"><br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password"><br><br>
            <input type="submit" value="Submit">
          </form>
        </body>
      </html>
    `);
  });
  

app.get('/login', (req, res) => {
    res.send(`
      <h1>Login Page</h1>
      <form method="POST" action="/login">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username"><br><br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password"><br><br>
        <button type="submit">Login</button>
      </form>
    `);
  });

  app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    res.status(200).send(`Welcome back, ${user.username}!`);
  } else {
    res.send('Invalid username or password!');
  }
});


  app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    
    // Push a new object to the users array with the signup information
    users.push({ username, password });
    
    res.send(`Thanks for signing up! ${users[0],users[1]}`);
  });
  
  app.get('/route3', (req, res) => {
    res.send('Hello World! from route2')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})