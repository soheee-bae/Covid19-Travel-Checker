var express = require('express');
var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken')

var router = express.Router();
router.use(express.json());

const jwtKey = "0f9841176d94679a9ba9c9165ceb713e73c5de54c461ac3bf1a9545c26504fae3a6e3cb9f1b1652f5422777c6a4b82e5bd299bffb45aa71cbac273c39c5d3965";

mongoose.connect('mongodb://localhost/my_db');
var account = mongoose.Schema({
   username: String,
   password: String,
   salt: String,
});
var Account = mongoose.model("Account", account);

Account.remove({}, (req, result) => { });

router.post('/login', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if (username == null || password == null)
		return res.sendStatus(404);

	const extractData = () => new Promise((resolve, reject) => {
		Account.findOne({ username: username }, (err, doc) => {
			if (err) return reject(err);
			if (doc == null) {
				//console.log("no exist reject");
				return reject("Username does not exist")
			};
			return resolve([doc.password, doc.salt]);
		});
	}).catch((err) => res.status(404).send(err));

	const hash = ([dbhash, salt]) => new Promise((resolve, reject) => {
		bcrypt.hash(password, salt, (err, hash) => {
			if (err) return reject(err);
			return resolve([dbhash, hash]);
		});
	});

	const compare = ([dbhash, hash]) => new Promise((resolve, reject) => {
		if (dbhash != hash) return reject( "Incorrect password");
		return resolve(null);
	}).catch((err) => res.status(404).send(err));

	const genJwt = (_) => new Promise((resolve, reject) => {
		console.log("genJwt");
		return resolve(jwt.sign({ username }, jwtKey));
	});

	const respond = (jwt) => new Promise((resolve, reject) => {
		console.log("respond");
		res.send(jwt);
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
	}).catch((err) => res.status(404).send(err));

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

module.exports = router;