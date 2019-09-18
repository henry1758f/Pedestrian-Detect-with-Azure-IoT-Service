
'use strict';

const chalk = require('chalk');

var fs = require('fs'); 
var data = fs.readFileSync('connectionString.string', 'utf8');
//[SYNNEX_DEBUG] console.log(data);
var connectionString = data;

// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var client_ulf = clientFromConnectionString(connectionString);

var intervalLoop = null;

function get_detected(str)
{

	for (let j = 0; j < process.argv.length; j++) 
	{
    	//[SYNNEX_DEBUG] console.log(j + ' -> ' + (process.argv[j]));
    	if ( process.argv[j] == str)
    	{
    		return process.argv[++j]
    	}
	}
  return "NULL";
}


// Send input message to your hub
function sendMessage()
{
  var message = new Message(JSON.stringify({
    Detected_TIME: get_detected("[TIME]"),
    Detected_ID: get_detected("[ID]"),
    Detected_LOC: get_detected("[LOC]"),
    Detected_ACC: get_detected("[ACC]"),
    Detected_ATT: get_detected("[ATT]"),
  }));

  console.log('Sending message: ' + message.getData());

  // Send the message.
  client.sendEvent(message, function (err) {
    if (err) {
      console.error('send error: ' + err.toString());
    } else {
      console.log('message sent');
      process.exit(1);
    }
  });
  
}

function sendFile(filePath)
{

//[SYNNEX_DEBUG]    console.log('[SYNNEX_DEBUG]: filePath is ' + filePath.toString());
    var txfs = require('fs');
    txfs.stat(filePath, function (err, fileStats) {
    if (err) 
    {
      console.error('could not read file: ' + err.toString());
      process.exit(-1);
    } 
    else 
    {
      var fileStream = txfs.createReadStream(filePath);
//[SYNNEX_DEBUG]      console.log('[SYNNEX_DEBUG]: Sending file : ' + filePath.toString());
      var filrname_blob = get_detected("[ID]") + ".jpg";
      client_ulf.uploadToBlob(filrname_blob , fileStream, fileStats.size, function (err, result) {
        fileStream.destroy();
        if (err) 
        {
          console.error('error uploading file: ' + err.constructor.name + ': ' + err.message);
          process.exit(-1);
        } 
        else 
        {
          console.log('Upload successful - ' + filrname_blob);
          process.exit(1);
        }
      });
    }

  });
  
}

var get_detected_str = get_detected("[FILE]");
if (get_detected_str == "NULL")
{
  sendMessage();
}
else
{
  sendFile(get_detected_str);
}


