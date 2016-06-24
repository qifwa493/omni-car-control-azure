##Step 1##
Install **WebMatrix 3** connect it to your azure account

Creat an empty node.js website, skip the **Prerequisites** step

Creat a New Web app in Azure


##Step 2##
Unzip the `node_modules.rar` file to the root folder

##Step 3##
Copy and replace the the files to your website

At last, the files in your website should be look something like this:

<img src="https://fitsbq.by3302.livefilestore.com/y3mO_PRkHMOmVZ4A8T3KznsZt3RqH15wf3uC4r2_-2tlFBthjQiCZqcuDhS--SyjZT3c8STrOzJUt5Gh0fHIOt1clu11c4dUsf6UodvsjQEzt16gyMF1Niz4ed1Y2P745E2XosigalS26c8XnwaTtuP6U9iOHPdtkb5sroz_wUf7Ng?width=193&height=455&cropmode=none" alt="server" width="193" height="455" />

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
