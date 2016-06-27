var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var rpio = require("rpio");

var intervalId = [,,,];
var speed = 10;
var lastCommand = 'stop';
var connectionString = 'HostName=myPiIoTHub.azure-devices.net;DeviceId=myPi;SharedAccessKey=X5uJf/+SYGPEA1Mlen5AwlclUBGr1Gnn1dXIZISZtCM=';

rpio.open(31, rpio.OUTPUT, 0);
console.log("GPIO 31 opened");
rpio.open(32, rpio.OUTPUT, 0);
console.log("GPIO 32 opened");
rpio.open(33, rpio.OUTPUT, 0);
console.log("GPIO 33 opened");
rpio.open(35, rpio.OUTPUT, 0);
console.log("GPIO 35 opened");
rpio.open(36, rpio.OUTPUT, 0);
console.log("GPIO 36 opened");
rpio.open(37, rpio.OUTPUT, 0);
console.log("GPIO 37 opened");
rpio.open(38, rpio.OUTPUT, 0);
console.log("GPIO 38 opened");
rpio.open(40, rpio.OUTPUT, 0);
console.log("GPIO 40 opened");

//Create a device client
var client = clientFromConnectionString(connectionString);

//Create a callback function
var connectCallback = function (err) {
	if (err) {
		console.error('Could not connect: ' + err);
	} else {
		console.log('Client connected\nNow listening...');
		
		client.on('message', function (msg) {
			var data = msg.data.toString();
			data = data.slice(data.indexOf(':') + 2, data.indexOf('}') - 1);
			console.log(data + ' received');
			
			if(data != 'low' && data != 'mid' && data != 'high') {
				handleCommand(data);
			}
			
			if(data == 'low') {
				speed = 20;
				handleCommand(lastCommand);
			}
			if(data == 'mid') {
				speed = 10;
				handleCommand(lastCommand);
			}
			if(data == 'high') {
				speed = 5;
				handleCommand(lastCommand);
			}
			
			client.complete(msg, function () {
				console.log('completed\n');
			});
		});
	}
};

//open connection
client.open(connectCallback);

function setPin(pin, motorId, state) {
	if(state == 0) {
		rpio.write(pin, state);
	}
	else {
		intervalId[motorId -1] = setInterval(function() {
			rpio.write(pin, 1);
			setTimeout(function() {
				rpio.write(pin, 0);
			}, 5);
		}, speed);
	}
	console.log('Pin ' + pin + ': ' + state);
}

function setMotor(motorId, state)
{
	var pin1, pin2;
	
	switch(motorId)
	{
		case '1':
		case 1: pin1 = 31; pin2 = 33; break;
		case '2':
		case 2: pin1 = 32; pin2 = 36; break;
		case '3':
		case 3: pin1 = 35; pin2 = 37; break;
		case '4':
		case 4: pin1 = 38; pin2 = 40; break;
	}
	
	clearInterval(intervalId[motorId -1]);
	if(state == 'on')
	{
		setPin(pin1, motorId, 1);
		setPin(pin2, motorId, 0);
		console.log('motor ' + motorId + ' is on!');
	}
	if(state == 'off')
	{
		setPin(pin1, motorId, 0);
		setPin(pin2, motorId, 0);
		console.log('motor ' + motorId + ' is off!');
	}
	if(state == 'back')
	{
		setPin(pin1, motorId, 0);
		setPin(pin2, motorId, 1);
		console.log('motor ' + motorId + ' is back!');
	}
}

function handleCommand(command) {
	lastCommand = command;
	
	if(command == "emStop") {
		clearInterval(intervalId[0]);
		clearInterval(intervalId[1]);
		clearInterval(intervalId[2]);
		clearInterval(intervalId[3]);
		setPin(31, 1, 0);
		setPin(32, 2, 0);
		setPin(33, 1, 0);
		setPin(35, 3, 0);
		setPin(36, 2, 0);
		setPin(37, 3, 0);
		setPin(38, 4, 0);
		setPin(40, 4, 0);
	} else if(command == "front") {
		setMotor(1, 'on');
		setMotor(2, 'back');
		setMotor(3, 'back');
		setMotor(4, 'on');
	} else if(command == "stop") {
		setMotor(1, 'off');
		setMotor(2, 'off');
		setMotor(3, 'off');
		setMotor(4, 'off');
	} else if(command == "back") {
		setMotor(1, 'back');
		setMotor(2, 'on');
		setMotor(3, 'on');
		setMotor(4, 'back');
	} else if(command == "left") {
		setMotor(1, 'on');
		setMotor(2, 'on');
		setMotor(3, 'back');
		setMotor(4, 'back');
	} else if(command == "right") {
		setMotor(1, 'back');
		setMotor(2, 'back');
		setMotor(3, 'on');
		setMotor(4, 'on');
	} else if(command == "frLe") {
		setMotor(1, 'on');
		setMotor(2, 'off');
		setMotor(3, 'back');
		setMotor(4, 'off');
	} else if(command == "frRi") {
		setMotor(1, 'off');
		setMotor(2, 'back');
		setMotor(3, 'off');
		setMotor(4, 'on');
	} else if(command == "baLe") {
		setMotor(1, 'off');
		setMotor(2, 'on');
		setMotor(3, 'off');
		setMotor(4, 'back');
	} else if(command == "baRi") {
		setMotor(1, 'back');
		setMotor(2, 'off');
		setMotor(3, 'on');
		setMotor(4, 'off');
	} else if(command == "cw") {
		setMotor(1, 'back');
		setMotor(2, 'back');
		setMotor(3, 'back');
		setMotor(4, 'back');
	} else if(command == "ccw") {
		setMotor(1, 'on');
		setMotor(2, 'on');
		setMotor(3, 'on');
		setMotor(4, 'on');
	} else {
		var motorId = command.slice(0,1);
		var state = command.slice(1);
		
		if (motorId != '1' && motorId != '2' && motorId != '3' && motorId != '4') {
			return;
		}
		
		setMotor(motorId, state);
	}
}
