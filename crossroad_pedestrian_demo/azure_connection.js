// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

'use strict';

const chalk = require('chalk');

// The device connection string to authenticate the device with your IoT hub.
//
// NOTE:
// For simplicity, this sample sets the connection string in code.
// In a production environment, the recommended approach is to use
// an environment variable to make it available to your application
// or use an HSM or an x509 certificate.
// https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-security
//
// Using the Azure CLI:
// az iot hub device-identity show-connection-string --hub-name {YourIoTHubName} --device-id MyNodeDevice --output table
var connectionString = 'connectionString';

// Using the Node.js Device SDK for IoT Hub:
//   https://github.com/Azure/azure-iot-sdk-node
// The sample connects to a device-specific MQTT endpoint on your IoT Hub.
var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

var intervalLoop = null;

function get_detected(str)
{

	for (let j = 0; j < process.argv.length; j++) 
	{
    	console.log(j + ' -> ' + (process.argv[j]));
    	if ( process.argv[j] == str)
    	{
    		return process.argv[++j]
    	}
	}
}


// Send a telemetry message to your hub
function sendMessage()
{
  // Simulate telemetry.
  var message = new Message(JSON.stringify({
    Detected_TIME: get_detected("[TIME]"),
    Detected_ID: get_detected("[ID]"),
    Detected_LOC: get_detected("[LOC]"),
    Detected_ACC: get_detected("[ACC]"),
    Detected_ATT: get_detected("[ATT]"),
  }));

  // Add a custom application property to the message.
  // An IoT hub can filter on these properties without access to the message body.
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


// Set up the handler for the SetTelemetryInterval direct method call.
//client.onDeviceMethod('SetTelemetryInterval', onSetTelemetryInterval);

// Create a message and send it to the IoT hub, initially every second.

sendMessage();
