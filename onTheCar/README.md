##Step 1:##
Install these packages on your Pi by using npm:
```
$ npm i azure-iot-device-mqtt
$ npm i azure-iot-device
$ npm i rpio
```

##Step 2:##
Open the `receive_control.js` file and navigate to:
```
var connectionString = '[Your device connection string]';
```
Replace the `[Your device connection string]` to your device connection string

##Step 3:##
Run the `receive_control.js` file:
```
$ node receive_control.js
```
