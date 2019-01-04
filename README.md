# Dummy IoT Gateway with IBM's IoT library
A server that configues both a dummy API client and a dummy temperature sensor client within the same Express.js app.

## /src/app.js
Configues the App client, which would be the IBM API we need to connect to.  When it connects,  it subscribes to the specific device(s) we want.
```javascript
appClient.subscribeToDeviceEvents(process.env.DEVICE_TYPE) // or leave blank for all events of all devices
```

At the top of the code, it imports the device client file simply so that the code of that file runs.
```javascript
require('./devices/temperature/client')
```

When any device it's subscribed to emits any kind of event, it just logs it for now.
```javascript
appClient.on('deviceEvent', (deviceType, deviceId, eventType, format, payload) => {
  console.log(`[App] Device Event (${eventType}) from ${deviceType} sensor [${deviceId}]:\n\t${payload}\n`)
})
```
## /src/devices/temperature/client.js
Similar to the main App client, except it only is used to publish data from a dummy temperature sensor.
When it connects, it calls an imported function from the device.js file which will start pumping out dummy data at an interval.
```javascript
deviceClient.on('connect', () => {
  console.log('[Device] Connection Successful 🚀')
  device.publishDummyData(deviceClient)  
})
```

## /src/devices/temperature/device.js
Sets some data for the device and has functions dealing with publishing dummy data.
### createDummyData(previousData)
Creates a random starting temperature from 0 to 120 degrees if no previousData is passed. Otherwise, it randomly increments, decrements or does nothing to the previous data.
### publishDummyData(client,startingTemperature = null, max = RANDMAX, min = RANDMIN)
Sets an interval which publishes the randomized data at the constant `INTVL_LENGTH`, which is currently set to two seconds.
Uses the `createDummyData` function to generature temperatures.
The most important part of this is the publish function for the client:
```javascript
client.publish('status','json',JSON.stringify(data),QoS_VALUE)
console.log('[Device] Data published:\n\t',data)
```
