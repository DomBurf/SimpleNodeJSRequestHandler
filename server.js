//set up the HTTP server

var http = require('http');
var url = require('url');

//amend these values as necessary
var port = "8888";
var domain = "127.0.0.1";

function start(route, handle){
	function OnRequest(request, response)
	{
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received");

		route(handle, pathname, response, request);
	}

	http.createServer(OnRequest).listen(port);
	console.log("Server running at " + domain + ":" + port);  
}

exports.start = start;

