# SimpleNodeJSRequestHandler

A simple request handler implemented in Node.JS. It allows the user to perform file uploads to the server. It can easily be extended to perform any number of HTTP requests on any HTTP URL.

# Usage

Download the code to a folder on your computer. To use this code you will need to have Node.JS installed on your computer. You will also need to install the formidable and fs-extra modules.

From the Node.JS commandline enter the following Node Package Manager commands:

 - npm install formidable@latest
 - npm install fs-extra

The formidable module takes care of the form processing. fs-extra adds additional functionality to the standard fs module. 

# Configuration

You will need to make a few minor changes to the code to get it to work.

 - server.js - change the port and domain as required
 - requestHandlers.js - change the variable server_path as required (this is the path on the server where the uploaded files are copied to)
 - 
# Using the code

 - Open the Node.JS commandline and navigate to the folder where the code is located
 - Type node index.js
 - Open your browser and open the URL http://localhost:8888/start (assuming you have used the same port number as initially configured. Otherwise enter the port number you have changed it to)
 - You should now see a simple file upload page. Use the file picker to select a file click the Upload File button. 
 - Your file will be uploaded to the server (to the folder you specified in requestHandlers.js in the variable server_path) and the file will be displayed to the browser).

# Extending the code

You can extend the code by simply adding new request handlers in index.js and implementing them in requestHandlers.js



