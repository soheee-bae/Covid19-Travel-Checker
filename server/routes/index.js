var express = require("express");
var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

var router = express.Router();

mongoose.connect("mongodb://localhost/my_db", {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
var account = mongoose.Schema({
  username: String,
  password: String,
  salt: String,
});
var Account = mongoose.model("Account", account);

Account.remove({}, (req, result) => {});

router.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  const extractData = () =>
    new Promise((resolve, reject) => {
      Account.findOne({ username: username }, (err, doc) => {
        if (err) return reject(err);
        if (doc == null) return reject("Username does not exist");
        return resolve([doc.password, doc.salt]);
      });
    });

  const hash = ([dbhash, salt]) =>
    new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        return resolve([dbhash, hash]);
      });
    });

  const compare = ([dbhash, hash]) =>
    new Promise((resolve, reject) => {
      if (dbhash != hash) return reject("Incorrect password");
      return resolve(null);
    });

  extractData()
    .then(hash)
    .then(compare)
    .then((_) => res.send("Login valid"))
    .catch((err) => res.send(404, "Login invalid: " + err));
});

router.post("/register", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  const verifyUnique = () =>
    new Promise((resolve, reject) => {
      Account.findOne({ username: username }, (err, doc) => {
        if (err) return reject(err);
        if (doc != null) return reject("Username already exists");
        return resolve(null);
      });
    });

  const salt = (_) =>
    new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return reject(err);
        return resolve(salt);
      });
    });

  const hash = (salt) =>
    new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return reject(err);
        return resolve([username, hash, salt]);
      });
    });

  const dbInsert = ([username, hash, salt]) =>
    new Promise((resolve, reject) => {
      return new Account({
        username: username,
        password: hash,
        salt: salt,
      }).save((err, account) => {
        if (err) return reject(err);
        return resolve(account);
      });
    });

  const respond = (_) =>
    new Promise((resolve, reject) => {
      res.send("Register success");
      return resolve(null);
    });

  verifyUnique(username)
    .then(salt)
    .then(hash)
    .then(dbInsert)
    .then((_) => res.send("Register success"))
    .catch((err) => res.send(404, "Register fail: " + err));
});

module.exports = router;
