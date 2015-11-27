/*	test/validator.js
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

			it('should throw RangeError when passed a number that is beyond the range of smallint', function(){
				var fn = function () { validator.isPosSmallInt(9999999); };
				fn.should.throw(RangeError);
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

		describe('#isEmail', function () {

			//Or, we can throw base errors and identify the condition by evaluating the error message:
			it ('should throw Error w/ specific message when email !match loose email format', function () {
				var fn3 = function() { validator.isEmail("not an email"); };
				var msgErr1 = "argument does not match format for email type. See RFC 5322.";
				fn3.should.throw(Error, msgErr1);
			});

			it ('should throw Error w/ specific message when local part of email > 64 characters ', function () {
				var verylonglocal = "the.local.part.of.an.email.address.must.not.exceed.64.characters.67";
				var verylonglocalemail = verylonglocal + "@bademail.com";
				var fn4 = function() { validator.isEmail(verylonglocalemail); };
				var msgErr2 = "argument has local part of email beyond 64 characters. See RFC 5322.";
				fn4.should.throw(Error,msgErr2);
			});

			it ('should throw Error with specific message when domain is too long', function () {
				var verylongdomain = "a.very.seriously.long.domain.name.that.keeps.going";
				while (verylongdomain.length < 206) { verylongdomain += "and.going"; }
				var verylongemail = verylongdomain + "@" + verylongdomain;
				var fn5 = function() { validator.isEmail(verylongemail); };
				var msgErr3 = "argument length beyond maximum length for email type. See RFC 5322.";
				fn5.should.throw(Error,msgErr3);
			});

		});

	});

});
