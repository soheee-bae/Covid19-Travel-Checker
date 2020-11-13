var express = require('express');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var axios = require('axios');

var router = express.Router();
//router.use(express.json());

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


// clear database (testing)
Account.remove({}, (req, result) => { });
StateData.remove({}, (req, result) => { });

// insert state data 
const fillDB = async () => {
	result = await axios("https://api.covidtracking.com/v1/states/current.json");
	for (var x in result.data) {
		new StateData({
			name: result.data[x].state,

			positive: result.data[x].positive,
			negative: result.data[x].negative,
			recovered: result.data[x].recovered,
			deaths: result.data[x].death,

			positiveIncrease: result.data[x].positiveIncrease,
			negativeIncrease: result.data[x].negativeIncrease,
			recoveredIncrease: result.data[x].recoveredIncrease,
			deathIncrease: result.data[x].deathIncrease,

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
		if (dbhash	 != hash) return reject( "Incorrect password");
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
	let register = async (username, password) => {
		// verify username/password are not null
		if (username == null || password == null)
			return Promise.reject("InvalidUsernameOrPassword");

		// verify username does not already exist
		await Account.findOne({ username: username })
			.then((u) => { if (u != null) return Promise.reject("UsernameAlreadyExists") });

		// generate salt
		let salt = await bcrypt.genSalt(10)
			.catch((_) => Promise.reject("SaltError"));

		// generate hash from password/salt
		let hash = await bcrypt.hash(password, salt)
			.catch((_) => Promise.reject("HashError"));

		// insert username/hash/salt into db
		await new Account({
			username: username,
			password: hash,
			salt: salt,
		}).save()
			.catch((_) => Promise.reject("DBInsertError"));

		// return jwt
		return Promise.resolve(jwt.sign({ username }, jwtKey));
	}

	// generate response
	register(req.body.username, req.body.password)
		.then((jwt) => res.status(200).send(jwt))
		.catch((err) => res.status(404).send(err));

	return;
});

router.get('/states/total', (req, res) => {
	StateData.find({}, (err, docs) => {
		if (err || docs == null) return res.sendStatus(404);

		let positive = 0;
		let negative = 0;
		let recovered = 0;
		let deaths = 0;

		let positiveIncrease = 0;
		let negativeIncrease = 0;
		let recoveredIncrease = 0;
		let deathIncrease = 0;

	
		for (let i in docs) {
			let doc = docs[i];

			positive += doc.positive;
			negative += doc.negative;
			recovered += doc.recovered;
			deaths += doc.deaths;

			positiveIncrease += doc.positiveIncrease;
			negativeIncrease += doc.negativeIncrease;
			recoveredIncrease += doc.recovered;
			deathIncrease += doc.deathIncrease;
		}

		return res.status(200).send({
			positive: positive,
			negative: negative,
			recovered: recovered,
			deaths: deaths,

			positiveIncrease: positiveIncrease,
			negativeIncrease: negativeIncrease,
			recoveredIncrease: recovered,
			deathIncrease: deathIncrease,
		});
	});
});

router.get('/states/:name', (req, res) => {
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

module.exports = router;