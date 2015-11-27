/*	test/validator_ex3.js
 */

var validator = require('../lib/validator.js');
var chai = require("chai");
var should = chai.should(); // note, should is instanced with a constructor

describe('Chai Should', function(){

	describe('validator', function() {

		describe('#isPosSmallInt', function () {

			it('should return false when passed a negative integer', function () {
				validator.isPosSmallInt(-1).should.be.false;
			});

			it ('should throw Error when passed a string', function (){
				var fn1 = function() {
					try {
						validator.isPosSmallInt("one");
					} catch (e) {
						//console.log("Error type: ", e.constructor.name);
						throw e;
					}
				};
				fn1.should.throw(Error);
			});

			//We can specify typed errors to make sure that we are catching the right error
			it ('should throw TypeError when passed', function () {
				var fn2 = function() { validator.isPosSmallInt(NaN); };
				fn2.should.throw(TypeError);
			});

		});

	});

});
