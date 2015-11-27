/*	test/validator_ex2.js
 */

var validator = require('../lib/validator.js');
var chai = require("chai");

var expect = chai.expect;
var test3 = expect( validator.isPosInt(1) ).to.be.true; // returns true

describe('validator', function(){

	describe('#isPosInt', function () {

		describe('Chai Expect', function() {
			it('expect result to be true when passed a positive integer', function () {
				expect( validator.isPosInt(1) ).to.be.true;
			});
		});

	});

});
