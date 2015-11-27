/*	lib/validator.js
 *
 * note: these are terrible functions that should otherwise just return false
 * instead raising errors. Latitude awarded for demonstration purposes only.
 */
var JSONValidator = require('jsonschema').Validator;
var validator = {};
module.exports = validator;

/* returns true when argument is a positive (signed) integer
 * returns false if negative or not an integer
 * throws TypeError if not a number or NaN
 * throws RangeError if beyond smallint range
 * throws Error if argument not supplied (undefined)
 *
 */
validator.isAgeMajority = function ( number ) {
	if ( typeof number == 'undefined' ) {
		throw new Error("An argument was not supplied.");
	} else {
		return ( this.isPosSmallInt(number) && number > 17 );
	}
};

validator.isPosSmallInt = function ( number ) {
	if ( this.isPosInt(number) ) {
		if ( number > 32767 || number < -32768 ) {
			throw new RangeError("argument is not a smallint.");
		} else return true;
	} else return false;
};

validator.isPosInt = function ( number ) {
	if ( typeof number != 'number' || isNaN(number) ) {
		throw new TypeError("argument must be a number.");
	} else if ( (number & 2147483647) == number ) {
		return true;
	}
	else return false;
};

validator.isEmail = function ( email ) {
	if ( typeof email == 'undefined') {
		throw new Error("An argument was not supplied.");
	} else if ( typeof email != 'string' || email === null ) {
		throw new TypeError("argument must be a string");
	} else if ( email.length > 254 ) {
		throw new Error("argument length beyond maximum length for email type. See RFC 5322.");
	} else if ( !email.match(/^\S+@\S+\.\S+$/) ) {
		throw new Error("argument does not match format for email type. See RFC 5322.");
	} else if ( email.split("@")[0].length > 64) {
		throw new Error("argument has local part of email beyond 64 characters. See RFC 5322.");
	} else return true;
};

validator.isProfile = function ( profile ) {
	var schema = {
		"type": "object",
		"properties": {
			"first_name" : {
				"type": "string"
			},
			"last_name": {
				"type": "string"
			},
			"birthday" : {
				"type": "string",
				"pattern": "^[0-9]{2}\/[0-9]{2}$"
    		},
			"interests": {
				"type": "array",
				"minItems": 0,
				"items": { "type": "string" },
				"uniqueItems": true
        	},
        	"skills": {
				"type": "array",
				"minItems": 0,
				"items": { "type": "string" },
				"uniqueItems": true
			}
		},
		"required": [ "first_name", "last_name","birthday" ],
		"additionalProperties": false
	};
	if (typeof profile == 'string') {
		try {
			profile = JSON.parse(profile);
		} catch (e) {
			throw new Error("the string argument passed could not be parsed as JSON.");
		}
	}
	try {
		var v = new JSONValidator();
		var validateOptions = {};
		validateOptions.throwError = false;
		var validationErrorArray = v.validate(profile, schema, validateOptions);
		if (validationErrorArray.length > 0) return validationErrorArray;
		else return true;
	} catch (e) {
		throw new Error('The supplied argument could not be validated with schema.');
	}
};
