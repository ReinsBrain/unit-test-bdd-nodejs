/*	lib/util.js
 */

var util = {};
module.exports = util;

/*	util.getHttpJSON (async) http get's data with parsed url and
 *	returns error or data (parsed JSON) to callback
 *
 *	parsedUrl_example:	{
 *		protocol:'https', host:'graph.facebook.com',
 *		 pathname:'/me', query: { "access_token":"..." }
 *	};
 */
util.getHttpJSON = function (parsedUrl, logger, next) {
	var url = require('url');
	var http = require('https');
	
	var strUrl = url.format(parsedUrl);
	http.get(strUrl, function (res) {		
		var strData = '';
		res.on('data', function (chunk) { strData += chunk; });
		res.on('error', function (error) {
			if (logger) { logger("Error getting data", parsedUrl, error); }
			return next(error, strData);
		});
		res.on('end', function () {
			try {
				var parsed = JSON.parse(strData);
				if (logger) { logger("Success getting data", strData); }
				return next(null, parsed);
			}
			catch (e) {
				if (logger) { logger("Error parsing data", e); }
				return next(e,"Could not parse JSON from server response.");
			}
		});
	});
};


