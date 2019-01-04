const ibmClient = require('ibmiotf')

const device = require('./device')

const deviceConfig = {
  org: process.env.ORG_ID,
  id: process.env.DEVICE_ID,
  domain: 'internetofthings.ibmcloud.com',
  type: process.env.DEVICE_TYPE,
  'auth-method': process.env.AUTH_METHOD,
  'auth-token': process.env.DEVICE_AUTH_TOKEN,
}

const deviceClient = new ibmClient.IotfDevice(deviceConfig)
deviceClient.connect()

deviceClient.on('connect', () => {
  console.log('[Device] Connection Successful 🚀')
  device.publishDummyData(deviceClient)  
})

deviceClient.on('error', (err) => {
  console.log('[Device] Error:\n' + error)
})