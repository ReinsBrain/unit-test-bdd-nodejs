/*	test/index.js
 */

var chai = require("chai");
var should = chai.should();

var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var main = require('../lib/index.js');

describe('#init', function () {

	it('should return undefined when email not supplied', function () {
		var fn = function () { main.init(); };
		fn.should.throw(Error, 'Email is required');
	});

	it('should return undefined when email parameter is not a string', function () {
		var fn = function () { main.init(1234); };
		fn.should.be.udefined;
	});

	it('should return undefined when age is under 18', function () {
		var fn = function () { main.init('foo@bar.com', 17); };
		fn.should.be.undefined;
	});

	it('should throw Error when age is not positive integer', function () {
		var fn = function () { main.init('foo@bar.com', "18"); };
		fn.should.throw(Error);
	});

	it('should return undefined when profile is invalid (not conforming to schema', function () {
		var fn = function () { main.init('foo@bar.com', 18, {} ); };
		fn.should.be.undefined;
	});

	describe ('validation.js', function () {
		var validation = require('./validator.js');
	});

});