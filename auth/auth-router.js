const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Users = require("./auth-model");

router.post("/register", (req, res) => {
  // implement registration
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 10;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.addUser(credentials)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Database error" });
      });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password, with password being alphanumeric"
    });
  }
});

router.post("/login", (req, res) => {
  // implement login
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy(username).then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome to our API", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    });
  } else {
    res.status(400).json({
      message:
        "Please provide username and password, with password being alphanumeric"
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}

module.exports = router;
