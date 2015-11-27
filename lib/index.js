/*	lib/index.js
 */

var main = {};
module.exports = main;

var validator = require('./validator.js');
var util = require('./util.js');

main.init = function ( email, age, profile ) {

	if (!email) throw new Error("Email is required");
	else {
		try {
			validator.isEmail(email);
		} catch ( e ) {
			return undefined;
		}
	}
	try {
		if ( !age || !validator.isAgeMajority(age) ) {
			return;
		}
	} catch (e) {
		return;
	}
	var parsedUrl = { protocol:'https', host:'bing.com', pathname:'/search', query: { q:encodeURIComponent(email) } };
	if (profile) {
		try { validator.isProfile(profile); }
		catch (e) {
			return undefined;
		}
		//https://www.bing.com/search?q=email%40reinpetersen+or+Rein+Petersen
		parsedUrl.query.q += "+or+" + encodeURIComponent(profile.first_name) + "+" + encodeURIComponent(profile.last_name); 
	}

	util.getHttpJSON(parsedUrl, console.log, function ( error, result ) {
		if (error) { return error; }
		else { return result; }
	});

};
