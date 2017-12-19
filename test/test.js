'use strict';

const chai   = require('chai');  
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /api', function() {  
	this.timeout(5000); // How long to wait for a response (ms)
	before(function() { });
	after(function() { });

	// POST - create friend connection
	it('should creat friend connection', function() {
		return chai.request(app)
			.post('/api/friendconnection')
			.send({
				"friends":
				[
					"andy@example.com",
					"john@example.com"
				]
			})
			.then(function(res) {
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				console.log(JSON.stringify(res.body, null, 4));

				var checkObj = { "success": true };
				expect(res.body).to.deep.equal(checkObj);
			});
	});

	// POST - create friend connection
	// add more connection for later testing
	[ 
		{ "friends": [ "andy@example.com", "sophia@example.com" ] },
		{ "friends": [ "andy@example.com", "emma@example.com" ] },
		{ "friends": [ "andy@example.com", "olivia@example.com" ] },
		{ "friends": [ "andy@example.com", "ava@example.com" ] },
		{ "friends": [ "andy@example.com", "mia@example.com" ] },
		{ "friends": [ "andy@example.com", "isabella@example.com" ] },

		{ "friends": [ "john@example.com", "ava@example.com" ] },
		{ "friends": [ "john@example.com", "mia@example.com" ] },
		{ "friends": [ "john@example.com", "isabella@example.com" ] }

	].forEach(value => {
		it('should creat friend connection', function() {
			return chai.request(app)
				.post('/api/friendconnection')
				.send(value)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					console.log(JSON.stringify(res.body, null, 4));

					var checkObj = { "success": true };
					expect(res.body).to.deep.equal(checkObj);
				});
		});
	});

	// friends list
	[ 
		{ "email": "andy@example.com" }

	].forEach(value => {
		it('should list friends', function() {
			return chai.request(app)
				.post('/api/friendlist')
				.send(value)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					console.log(res.body);
				});
		});
	});

	// common friends list
	[ 
		{ friends: [ "andy@example.com", "john@example.com" ] }
	].forEach(value => {
		it('should list common friends', function() {
			return chai.request(app)
				.post('/api/commonlist')
				.send(value)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					console.log(res.body);
				});
		});
	});


	// subscribe
	[ 
		{ "requestor": "lisa@example.com", "target": "john@example.com" }
	].forEach(value => {
		it('should set subscribe', function() {
			return chai.request(app)
				.post('/api/subscribe')
				.send(value)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					console.log(JSON.stringify(res.body, null, 4));

					var checkObj = { "success": true };
					expect(res.body).to.deep.equal(checkObj);
				});
		});
	});

	// block 
	[ 
		{ "requestor": "andy@example.com", "target": "john@example.com" }
	].forEach(value => {
		it('should set block ', function() {
			return chai.request(app)
				.post('/api/block')
				.send(value)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					console.log(JSON.stringify(res.body, null, 4));

					var checkObj = { "success": true };
					expect(res.body).to.deep.equal(checkObj);
				});
		});
	});

	// update list
	[ 
		{ "sender":  "andy@example.com", "text": "Hello World! kate@example.com" } 
	].forEach(value => {
		it(`should list update recipients: \n `, function() {
			return chai.request(app)
				.post('/api/updatelist')
				.send(value)
				.then(function(res) {
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					console.log(res.body);
				});
		});
	});
});

