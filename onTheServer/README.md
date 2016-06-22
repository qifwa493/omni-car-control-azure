##Step 1##
Install **WebMatrix 3** connect it to your azure account

Creat an empty node.js website, skip the **Prerequisites** step

Creat a New Web app in Azure


##Step 2##
Unzip the `node_modules.rar` file to the root folder

##Step 3##
Copy and replace the the files to your website

At last, the files in your website should be look like this:

<img src="https://fitrbq.by3302.livefilestore.com/y3mVkqMUQTAJrl_S4k0if1reMrCw3naoSg9LFeWbEmo2wmk7I04wxoLOUzBXZLyiy5cocAaMgj3JK72JL_UxEnB90iflDlARG7Uke4viiNAS3GS5fawTMldcEN9huSgWpMj-WtLCbhN0bI1p5HUPPj4YZDg1rJ5rF92KY02NV5YB6I?width=191&height=297&cropmode=none" alt="server" width="191" height="297" />

##Step 4##
Open the `server.js` file navigate to:
```
var connectionString = '[Your IoT hub connection string]';
var client = Client.fromConnectionString(connectionString);
var targetDevice = '[Your deviceId]';
```
Replace the `[Your IoT hub connection string]` and `[Your deviceId]`

##Step 5##
Publish your website to the Azure webapp you just created

Now you can access the website by going to:
```
http://[Your webapp name].azurewebsites.net
```
