var express = require("express");
var bcrypt = require("bcryptjs");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var axios = require("axios");
var nodemailer = require("nodemailer");
var restrictionData = require("../restrictions/restrictions.json");
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
  states: [String],
  admin: Boolean,
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
});
var StateData = mongoose.model("StateData", stateData);

//create state Restriction schema
var stateRestriction = mongoose.Schema({
  State: String,
  Abbreviation: String,
  TravelerRestrictions: String,
  BorderClosure: String,
  Curfew: String,
  MaskRequirement: String,
  NonEssentialStoresOpen: String,
  RestaurantsOpen: String,
});
var StateRestriction = mongoose.model("StateRestriction", stateRestriction);

//create testsite schema
let Schema = mongoose.Schema;
var TestSite = mongoose.model("TestSite", new Schema({}), "testsite");

// clear database (testing)
Account.remove({}, (req, result) => {});
StateData.remove({}, (req, result) => {});

// insert state data
const fillDatabase = async () => {
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash("admin1", salt);
  await new Account({
    username: "admin",
    password: hash,
    states: ["E"],
    admin: true,
  }).save();

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
    }).save();
  });

  //inset restrictions of state data
  restrictionData.map(async (state) => {
    await new StateRestriction({
      State: state.State,
      Abbreviation: state.Abbreviation,
      TravelerRestrictions: state.TravelerRestrictions,
      BorderClosure: state.BorderClosure,
      Curfew: state.Curfew,
      MaskRequirement: state.MaskRequirement,
      NonEssentialStoresOpen: state.NonEssentialStoresOpen,
      RestaurantsOpen: state.RestaurantsOpen,
    }).save();
  });
};

fillDatabase();

let validateLogin = (req, res, next) => {
  let validateToken = async (token) => {
    // ensure token exists
    if (token == null) throw "InvalidJWT";

    // decrypt token
    let res = await jwt.verify(token, jwtKey);

    // set username to username found within jwt
    req.body.username = res.username;
    return null;
  };

  validateToken(req.body.jwt)
    .then((_) => next())
    .catch((err) => res.status(404).send(err));

  return;
};

let validateAdmin = (req, res, next) => {
  let validateAdm = async (username) => {
    let account = await Account.findOne({ username: username }).then((doc) => {
      if (doc == null) throw "UsernameDoesNotExist";
      return doc;
    });

    if (account.admin == false) {
      throw "AccountNotAdmin";
    }

    return null;
  }

  validateAdm(req.body.username)
    .then((_) => next())
    .catch((err) => res.status(404).send(err));

  return;
}

router.post("/login", (req, res) => {
  let login = async (username, password) => {
    // verify username/password are not null
    if (username == null || password == null) throw "InvalidUsernameOrPassword";

    // extract password/salt for this username
    let doc = await Account.findOne({ username: username }).then((doc) => {
      if (doc == null) throw "UsernameDoesNotExist";
      return doc;
    });

    let res = await bcrypt.compare(password, doc.password).catch((_) => {
      throw "HashError";
    });

    if (!res) throw "IncorrectPassword";

    // return jwt
    return {admin: doc.admin, jwt: jwt.sign({ username }, jwtKey)};
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
    if (username == null || password == null) throw "InvalidUsernameOrPassword";

    // verify username does not already exist
    await Account.findOne({ username: username }).then((u) => {
      if (u != null) throw "UsernameAlreadyExists";
    });

    // generate salt
    let salt = await bcrypt.genSalt(10).catch((_) => {
      throw "SaltError";
    });

    // generate hash from password/salt
    let hash = await bcrypt.hash(password, salt).catch((_) => {
      throw "HashError";
    });

    // insert username/hash into db
    await new Account({
      username: username,
      password: hash,
      states: [],
      admin: false,
    })
      .save()
      .catch((_) => {
        throw "DBInsertError";
      });

    // return jwt
    return jwt.sign({ username }, jwtKey);
  };

  // generate response
  register(req.body.username, req.body.password)
    .then((jwt) => res.status(200).send(jwt))
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });

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
    .catch((err) => res.status(404).send(err));

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

      lastUpdated: doc.lastUpdated,
    });
  });
});

router.get("/staterestriction/:name", (req, res) => {
  StateRestriction.findOne({ State: req.params.name }, (err, doc) => {
    if (err || doc == null) return res.sendStatus(404);
    return res.status(200).send({
      State: doc.State,
      Abbreviation: doc.Abbreviation,
      TravelerRestrictions: doc.TravelerRestrictions,
      BorderClosure: doc.BorderClosure,
      Curfew: doc.Curfew,
      MaskRequirement: doc.MaskRequirement,
      NonEssentialStoresOpen: doc.NonEssentialStoresOpen,
      RestaurantsOpen: doc.RestaurantsOpen,
    });
  });
});

router.post("/towatch", validateLogin, (req, res) => {
  let f = async (username, states) => {
    // get account
    let account = await Account.findOne({ username: username }).catch((_) => {
      throw "UsernameDoesNotExist";
    });

    // if a "states" is provided,
    if (states != null) {
      console.log("state:" + states);
      account.states = states;
      await account.save().catch((_) => {
        throw "DatabaseError";
      });
    }

    return account.states;
  };

  f(req.body.username, req.body.selectedState)
    .then((states) => res.status(200).send(states))
    .catch((err) => res.status(404).send(err));

  return;
});

router.post("/stateset", validateLogin, validateAdmin, (req, res) => {
  let setPolicy = async (restriction) => {
    const {
      selectedState,
      airlineEntry,
      border,
      curfew,
      mask,
      stores,
      restaurants,
    } = restriction;

    let st = await StateRestriction.findOne({ State: selectedState }).then((doc) => {
      if (doc == null) throw "StateDoesNotExist";
      return doc;
    });

    if (restriction != null) {
      st.TravelerRestrictions = airlineEntry;
      st.BorderClosure = border;
      st.Curfew = curfew;
      st.MaskRequirement = mask;
      st.NonEssentialStoresOpen = stores;
      st.RestaurantsOpen = restaurants;
    }
    await st.save().catch((_) => {
      throw "DatabaseError";
    });
  };

  setPolicy(req.body)
    .then((_) => res.status(200).send(null))
    .catch((err) => res.status(404).send(err));

  return;
});

router.post("/mail", (req, res) => {
  //Get the list of users who selected the target state
  const getuserlist = async (dataobject) => {
    let state = dataobject.selectedState;

    let account = await Account.find({
      states: { $all: [`${state}`] },
    }).catch((_) => {
      throw "UsernameDoesNotExist";
    });

    let userlist = account.map((acc) => {
      return acc.username;
    });

    return userlist;
  };

  //Send email to users
  const mailing = async (dataobject) => {
    let users = await getuserlist(dataobject);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "fireferrets.project@gmail.com",
        pass: "mwnrzfkbyedzggce",
      },
    });

    var mailbody = `
    <h1>Hi!,</h1>We are sending you this email to let you know that there is an update on your state.<br>
    <BLOCKQUOTE>
    <B>State:</B> ${dataobject.selectedState},<br>
    <B>TravelerRestrictions:</B> ${dataobject.airlineEntry},<br>
    <B>BorderClosure:</B> ${dataobject.border},<br>
    <B>Curfew:</B> ${dataobject.curfew},<br>
    <B>MaskRequirement:</B> ${dataobject.mask},<br>
    <B>Non Essential Stores Open:</B> ${dataobject.stores},<br>
    <B>Restaurants Open:</B> ${dataobject.restaurants},<br>
    </BLOCKQUOTE><br>
    </B>Thank you for joining us.</B><br>
    <br>Regards,<br>FireFerrets`;

    var mailOptions = {
      from: "fireferrets.project@gmail.com",
      to: `${users.toString()}`,
      subject: "There is an update on your state!",
      html: mailbody,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  mailing(req.body);
});

router.get("/testsites", (req, res) => {
  let testisitefunction = async () => {
    return await TestSite.find({}).then((doc) => {
      if (doc == null) throw "UsernameDoesNotExist";
      return doc;
    });
  };

  testisitefunction()
    .then((testsites) => res.status(200).send(testsites))
    .catch((err) => res.status(404).send(err));

  return;
});

router.post("/refresh", (req, res) => {});

module.exports = router;
