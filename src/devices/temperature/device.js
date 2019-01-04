// random max and min normal temperature range
const RANDMAX = Math.round(Math.random() * 50) + 50
const RANDMIN = RANDMAX - Math.round(Math.random() * 20) + 20

const INTVL_LENGTH = 2000
const QoS_VALUE = 2

// creates a new random starting temperature reading
// randomly increments/decrements in small intervals based on previous data if not the first call
function createDummyData(previousData){
  return previousData ? 
    (Math.round(Math.random() * 2)) * (Math.round(Math.random()) ? 1:-1) + previousData
    :
    Math.round(Math.random() * 120)
}

//uses the device client to publish a new reading every 5 seconds
//uses randomized default arguments which can be overridden with hard-coded ones
module.exports.publishDummyData = (client, startingTemperature = null, max = RANDMAX, min = RANDMIN) => {

  let previousData

  setInterval(() => {

    const temperature = startingTemperature || createDummyData(previousData)
    previousData = temperature

    if(startingTemperature) startingTemperature = null

    const data = {
      temperature,
      max,
      min,
      isLow: temperature < min,
      isHigh: temperature > max
    }

    client.publish('status','json',JSON.stringify(data),QoS_VALUE)
    console.log('[Device] Data published:\n\t',data)

  },
  INTVL_LENGTH)

}