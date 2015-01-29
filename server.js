/**
 * This file exists to serve up some HTML/JS files to develop the API tester.
 *
 * Usage:
 *
 * [export PORT=...]
 * node server.js
 */
var express = require('express');
var app = express();

var port = process.env['PORT'] || 8338;

// Quick and dirty - expose all static files in this directory.
app.use('/', express.static(__dirname + '/dist'));

// Run the server!
var server = app.listen(port, function() {
    console.log("Listening on port " + port);
});