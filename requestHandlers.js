//Define the application's route handlers.
//start - displays the file upload form
//upload - uploads the specified file to the server
//show - displays the uploaded file 

//imports the formidable and fs-extra modules. 
//formidable takes care of parsing the form data
//during the file upload
//fs-extra adds additional functionality to the stabdard fs module

var querystring = require("querystring"), 
	fs = require("fs-extra"),
	formidable = require("formidable"),
	util = require('util');

//change this path to the appropriate server path as required
var server_path = "C:/sandpit/NodeJS/BasicHTTPServer/";
var new_file_name = "";

//display the fileupload form
function start(response, postData)
{
	console.log("Request handler 'start' was called");
	
	var body = '<html>' + 
		'<html>' + 
		'<meta http-equiv="Content-Type" content="text/html"; ' + 
		'charset=UTF-8 />' + 
		'</head>' + 
		'<body>' + 
		'<form action="/upload" enctype="multipart/form-data" method="post">' + 
		'<input type="file" name="upload multiple="multiple" />' + 
		'<input type="submit" value="Upload file" />' + 
		'</form>' + 
		'</body>' + 
		'</html>';

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
}

function upload(response, request)
{
	console.log("Request handler 'upload' was called");
	//use formidable to parse the form data
	var form = new formidable.IncomingForm();

	//parse an incoming request
	form.parse(request, function(error, fields, files)
	{
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<p>Received upload</p>");
	});

	//define the formidable event emitters

	//emitted when the entire request has been received and all contained files 
	//have been flushed to disk
	form.on("end", function(fields, files)
	{
		var temp_path = this.openedFiles[0].path;
		var file_name = this.openedFiles[0].name;
		new_file_name = server_path + file_name;

		console.log("New filename: " + new_file_name);

		fs.copy(temp_path, new_file_name, function(err)
		{
			if (err)
			{
				console.log("Error. See details below");
				console.error(err);
			}
			else
			{
				console.log("File uploaded successfully");
				response.write("<img src='/show' />");
				//response.end();
			}
		});
	});

	//emitted after each incoming chunk of data that has been parsed
	form.on("progress", function(bytesReceived, bytesExpected)
	{
		var percentComplete = (bytesReceived / bytesExpected) * 100;
		console.log(percentComplete.toFixed(2) + " completed");
	});
}

//display the image file to the browser
function show(response)
{
	console.log("Request handler for 'show' was called");
	response.writeHead(200, {"Content-Type": "image/png"});
	fs.createReadStream(new_file_name).pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
