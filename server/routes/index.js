var express = require("express");
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var axios = require("axios");

var router = express.Router();
//router.use(express.json());

const jwtKey =
  "0f9841176d94679a9ba9c9165ceb713e73c5de54c461ac3bf1a9545c26504fae3a6e3cb9f1b1652f5422777c6a4b82e5bd299bffb45aa71cbac273c39c5d3965";

// connect to database
mongoose.connect("mongodb://localhost/my_db");

// create account schema
var account = mongoose.Schema({
  username: String,
  password: String,
  states: [
    {
      _id: 0,
      value: String,
      label: String,
    },
  ],
  salt: String,
});
var Account = mongoose.model("Account", account);

// create state schema
var stateData = mongoose.Schema({
  name: String,

  positive: Number,
  negative: Number,
  recovered: Number,
  deaths: Number,

  positiveIncrease: Number,
  negativeIncrease: Number,
  deathIncrease: Number,

  lastUpdated: String,
  policy: String,
});
var StateData = mongoose.model("StateData", stateData);

//create testsite schema
let Schema = mongoose.Schema;
var TestSite = mongoose.model("TestSite", new Schema({}), "testsite");

// clear database (testing)
Account.remove({}, (req, result) => {});
StateData.remove({}, (req, result) => {});

// insert state data
const fillDatabase = async () => {
  result = await axios("https://api.covidtracking.com/v1/states/current.json");
  result.data.map(async (state) => {
    await new StateData({
      name: state.state,

      positive: state.positive,
      negative: state.negative,
      recovered: state.recovered,
      deaths: state.death,

      positiveIncrease: state.positiveIncrease,
      negativeIncrease: state.negativeIncrease,
      recoveredIncrease: state.recoveredIncrease,
      deathIncrease: state.deathIncrease,

      lastUpdated: state.lastUpdateEt,

      policy: "dont get sick",
    }).save();
  });
};
fillDatabase();

router.post("/login", (req, res) => {
  let login = async (username, password) => {
    // verify username/password are not null
    if (username == null || password == null)
      throw "InvalidUsernameOrPassword";

    // extract password/salt for this username
    let [dbhash, salt] = await Account.findOne({ username: username }).then(
      (doc) => {
        if (doc == null) throw "UsernameDoesNotExist";
        else return [doc.password, doc.salt];
      }
    );

    // generate hash from password/salt
    let hash = await bcrypt
      .hash(password, salt)
      .catch((_) => { throw "HashError" });

    // compare generated hash to stored hash
    if (dbhash != hash) 
      throw "IncorrectPassword";

    // return jwt
    return jwt.sign({ username }, jwtKey);
  };

  // generate response
  login(req.body.username, req.body.password)
    .then((jwt) => res.status(200).send(jwt))
    .catch((err) => res.status(404).send(err));

  return;
});

router.post("/register", (req, res) => {
  let register = async (username, password) => {
    // verify username/password are not null
    if (username == null || password == null)
      throw "InvalidUsernameOrPassword";

    // verify username does not already exist
    await Account.findOne({ username: username }).then((u) => {
      if (u != null) throw "UsernameAlreadyExists";
    });

    // generate salt
    let salt = await bcrypt
      .genSalt(10)
      .catch((_) => { throw "SaltError" });

    // generate hash from password/salt
    let hash = await bcrypt
      .hash(password, salt)
      .catch((_) => { throw "HashError" });

    // insert username/hash/salt into db
    await new Account({
      username: username,
      password: hash,
      salt: salt,
    })
      .save()
      .catch((_) => { throw "DBInsertError" });

    // return jwt
    return jwt.sign({ username }, jwtKey);
  };

  // generate response
  register(req.body.username, req.body.password)
    .then((jwt) => res.status(200).send(jwt))
    .catch((err) => res.status(404).send(err));

  return;
});

router.get("/states/total", (req, res) => {
  let total = async () => {
    let states = await StateData.find({});
    let final = states.reduce((acc, doc) => {
      acc.positive += doc.positive;
      acc.negative += doc.negative;
      acc.recovered += doc.recovered;
      acc.deaths += doc.deaths;
      acc.positiveIncrease += doc.positiveIncrease;
      acc.negativeIncrease += doc.negativeIncrease;
      acc.recoveredIncrease += doc.recoveredIncrease;
      acc.deathIncrease += doc.deathIncrease;
      return acc;
    });

    return {
      positive: final.positive,
      negative: final.negative,
      recovered: final.recovered,
      deaths: final.deaths,
      positiveIncrease: final.positiveIncrease,
      negativeIncrease: final.negativeIncrease,
      recoveredIncrease: final.recoveredIncrease,
      deathIncrease: final.deathIncrease,
    };
  };

  total()
    .then((total) => res.status(200).send(total))
    .catch((_) => res.status(404).send(null));

  return;
});

router.get("/states/:name", (req, res) => {
  StateData.findOne({ name: req.params.name }, (err, doc) => {
    if (err || doc == null) return res.sendStatus(404);
    return res.status(200).send({
      name: doc.name,

      positive: doc.positive,
      negative: doc.negative,
      recovered: doc.recovered,
      deaths: doc.deaths,

      deathIncrease: doc.deathIncrease,
      positiveIncrease: doc.positiveIncrease,
      negativeIncrease: doc.negativeIncrease,

      policy: doc.policy,
      lastUpdated: doc.lastUpdated,
    });
  });
});

router.post("/towatch", (req, res) => {
  let stateFunction = async (username, selectedState) => {
    // get the account associated with this username
    let account = await Account.findOne({ username: username })
      .catch((_) => { throw "UsernameDoesNotExist" });

    // push the selected state to the watch list and update the database
    account.states.push(selectedState);
    account.save();

    return null;
  };

  // generate response
  stateFunction(req.body.username, req.body.selectedState)
    .then((_) => res.sendStatus(200))
    .catch((_) => res.status(404).send(null));

  return;
});

router.get("/towatchData/:username", (req, res) => {
  let towatchfunction = async (username) => {
    // get the account associated with this username
    let account = await Account.findOne({ username: username })
      .catch((_) => { throw "UsernameAlreadyExists" });

    return account.selectedState;
  };

  // generate response
  towatchfunction(req.params.username)
    .then((selectedState) => res.status(200).send(selectedState))
    .catch((_) => res.status(404).send(null));

  return;
});

router.get("/testsites", (req, res) => {
  let testisitefunction = async () => {
    return await TestSite.find({});
  };

  testisitefunction()
    .then((testsites) => res.status(200).send(testsites))
    .catch((_) => res.status(404).send(null));

  return;
});

module.exports = router;
