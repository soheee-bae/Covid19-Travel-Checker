var express = require('express');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var axios = require('axios');

var router = express.Router();
router.use(express.json());

const jwtKey = "0f9841176d94679a9ba9c9165ceb713e73c5de54c461ac3bf1a9545c26504fae3a6e3cb9f1b1652f5422777c6a4b82e5bd299bffb45aa71cbac273c39c5d3965";

// connect to database
mongoose.connect('mongodb://localhost/my_db');

// create account schema
var account = mongoose.Schema({
   username: String,
   password: String,
   salt: String,
});
var Account = mongoose.model("Account", account);

// create state schema
var stateData = mongoose.Schema({
   name: String,
   confirmed: Number,
   tested: Number,
   recovered: Number,
   deaths: Number,
   lastUpdated: String,
   policy: String,
});
var StateData = mongoose.model("StateData", stateData);


// clear database (testing)
Account.remove({}, (req, result) => { });
StateData.remove({}, (req, result) => { });

// insert state data 
const fillDB = async () => {
	result = await axios("https://api.covidtracking.com/v1/states/current.json");
	for (var x in result.data) {
		new StateData({
			name: result.data[x].state,
			confirmed: result.data[x].positive,
			tested: result.data[x].positive + result.data[x].negative,
			recovered: result.data[x].recovered,
			deaths: result.data[x].death,
			lastUpdated:result.data[x].lastUpdateEt,
			policy: "dont get sick"
		}).save((err, account) => { });
	}
}
fillDB()

router.post('/login', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if (username == null || password == null)
		return res.sendStatus(404);

	const extractData = () => new Promise((resolve, reject) => {
		Account.findOne({ username: username }, (err, doc) => {
			if (err) return reject(err);
			if (doc == null) return reject("Username does not exist")
			return resolve([doc.password, doc.salt]);
		});
	});

	const hash = ([dbhash, salt]) => new Promise((resolve, reject) => {
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) return reject(err);
			return resolve([dbhash, hash]);
		});
	});

	const compare = ([dbhash, hash]) => new Promise((resolve, reject) => {
		if (dbhash != hash) return reject( "Incorrect password");
		return resolve(null);
	});

	const genJwt = (_) => new Promise((resolve, reject) => {
		console.log("genJwt");
		return resolve(jwt.sign({ username }, jwtKey));
	});

	const respond = (jwt) => new Promise((resolve, reject) => {
		console.log("respond");
		res.status(200).send(jwt);
		return resolve(null);
	});

	extractData()
		.then(hash)
		.then(compare)
		.then(genJwt)
		.then(respond)
		.catch((err) => res.sendStatus(404));
});

router.post('/register', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if (username == null || password == null)
		return res.sendStatus(404);

	const verifyUnique = () => new Promise((resolve, reject) => {
		Account.findOne({username: username}, (err, doc) => {
			if (err) return reject(err);
			if (doc != null) return reject("Username already exists");
			return resolve(null);
		});
	});

	const hash = (salt) => new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) return reject(err);
			bcrypt.hash(password, salt, (err, hash) => {
				if (err) return reject(err);
				return resolve([hash, salt]);
			});
		});
	});

	const dbInsert = ([hash, salt]) => new Promise((resolve, reject) => {
		return new Account({
			username: username,
			password: hash,
			salt: salt,
		}).save((err, account) => {
			if (err) return reject(err);
			return resolve(null);
		});
	});

	const genJwt = (_) => new Promise((resolve, reject) => {
		return resolve(jwt.sign({ username }, jwtKey));
	});

	const respond = (jwt) => new Promise((resolve, reject) => {
		res.status(200).send(jwt);
		return resolve(null);
	});

	verifyUnique(username)
		.then(hash)
		.then(dbInsert)
		.then(genJwt)
		.then(respond)
		.catch((err) => res.sendStatus(404));
});

router.get('/states/total', (req, res) => {
	StateData.find({}, (err, docs) => {
		if (err || docs == null) return res.sendStatus(404);

		let confirmed = 0;
		let tested = 0;
		let recovered = 0;
		let deaths = 0;
	
		for (let i in docs) {
			let doc = docs[i];
			confirmed += doc.confirmed;
			
			tested += doc.tested;
			recovered += doc.recovered;
			deaths += doc.deaths;
		}

		return res.status(200).send({
			confirmed: confirmed,
			tested: tested,
			recovered: recovered,
			deaths: deaths,
		});
	});
});

router.get('/states/:name', (req, res) => {
	StateData.findOne({ name: req.params.name }, (err, doc) => {
		if (err || doc == null) return res.sendStatus(404);
		return res.status(200).send({ 
   			name: doc.name,
   			confirmed: doc.confirmed,
   			tested: doc.tested,
   			recovered: doc.recovered,
   			deaths: doc.deaths,
			policy: doc.policy,
			lastUpdated: doc.lastUpdated,
		});
	});
});

module.exports = router;