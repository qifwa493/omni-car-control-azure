'use strict'

var http = require('http').createServer(handler);
var fs = require('fs');
var io = require("socket.io").listen(http);
var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
var events = require('events');

var eventEmitter = new events.EventEmitter();
var connectionString = 'HostName=myPiIoTHub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=jDMJzcnbfD7Yn60frypRW/R8uT4bEFZlZl0eoQlR+xk=';
var client = Client.fromConnectionString(connectionString);
var targetDevice = 'myPi';

function handler (req, res) {
    if (req.method == 'GET')
	{
		if (req.url == '/' || req.url == '/index.html') var reqUrl = 'index.html';
		else var reqUrl = req.url.slice(1);
		fs.readFile(reqUrl, function (err, data) {
			if (err) {
				res.writeHead(500);
				return res.end("Error loading");
			}
			
			res.writeHead(200);
			res.end(data);
		});
	}
}

function printResultFor(op) {
	return function printResult(err, res) {
		if (err) console.log(op + ' error: ' + err.toString());
		if (res) eventEmitter.emit('socket', op + ' sent');
	};
}

//send new message to device
var connectCallback = function (err) {
	if (err) {
		console.log('Could not connect: ' + err);
	} else {
		console.log('Client connected');

        //listen the azure event
        eventEmitter.on('azure', function (data) {
            var temp = JSON.stringify({"Command":data});
			var message = new Message(temp);
			client.send(targetDevice, message, printResultFor(data));
		});
	}
};

//connect and send
client.open(connectCallback);
//start the server
http.listen(process.env.PORT || 8080);

io.sockets.on("connection", function (socket) {
	socket.emit("message", "Connected");
	socket.on("button", function (data) {
		socket.emit("message", data + " received");
        eventEmitter.emit('azure', data);
	});

    //listen the socket event
    eventEmitter.on('socket', function (data) {
		socket.emit('message', data);
	});
});