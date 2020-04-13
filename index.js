var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var handleError = require('./handleError');
var wss = require('./websockets-server');


var server = http.createServer(function (req, res) {
    console.log('Responding to a request.');
    var filePath = extract(req.url);
    fs.readFile(filePath, function (err, data) {
        if (err) {
            handleError(err, res, filePath);
            return;
        } else {
            res.end(data);
        }
    });
});
server.listen(3000);