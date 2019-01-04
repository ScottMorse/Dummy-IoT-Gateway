const app = require('express')()
const ibmClient = require('ibmiotf')
require('dotenv').config()

require('./devices/temperature/client')

const appConfig = {
  org: process.env.ORG_ID,
  id: process.env.API_KEY,
  domain: 'internetofthings.ibmcloud.com',
  'auth-key': process.env.API_KEY,
  'auth-token': process.env.API_AUTH_TOKEN
}

appClient = new ibmClient.IotfApplication(appConfig)

appClient.connect()

appClient.on('connect', () => {
  console.log('[App] Connection Successful 🚀')
  appClient.subscribeToDeviceEvents(process.env.DEVICE_TYPE) // or leave blank for all events
})

appClient.on('disconnect', () => {
  console.log('[App] Disconnected')
})

appClient.on('deviceEvent', (deviceType, deviceId, eventType, format, payload) => {
  console.log(`[App] Device Event (${eventType}) from ${deviceType} sensor [${deviceId}]:\n\t${payload}\n`)
})

appClient.on('error', (err) => {
  console.log('[App] Error:\n',err)
})

app.listen(process.env.PORT, ()=>console.log('Listening on port ' + process.env.PORT))