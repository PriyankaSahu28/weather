// server.js
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'weather'; // Replace with your actual MongoDB database name

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'mongodb://localhost:27017',
    resave: false,
    saveUninitialized: true,
  })
);

let db;

MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MongoDB');
  db = client.db(DB_NAME);
});

app.get('/', (req, res) => {
  res.send('Welcome to the MongoDB Authentication Example');
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Please provide both email and password.');
  }

  try {
    const user = await db.collection('weatherdata').findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid credentials.');
    }

    req.session.user = user;
    res.send('You are now signed in.');
  } catch (error) {
    console.log(error);
    res.status(500).send('An error occurred while signing in.');
  }
});

app.get('/signout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session:', err);
      return res.status(500).send('An error occurred while signing out.');
    }
    res.send('You are now signed out.');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
