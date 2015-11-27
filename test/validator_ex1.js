/*	test/validator_ex1.js
 */

var validator = require('../lib/validator.js');
var assert = require('assert'); // basic assertion library provided by NodeJS


describe('validator', function (){

	describe('#isPosInt', function () {

		describe('NodeJS assert', function () {
			it('assert isPosSmallInt(-1) is false', function () {
				assert.equal( validator.isPosSmallInt(-1), false );
			});

			it('assert isPosSmallInt("minus one") throws TypeError', function () {
				var fn = function () { validator.isPosSmallInt("minus one"); };
				assert.throws( fn, TypeError );
			});

		});

	});

});
