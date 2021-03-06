const human = require('interval-to-human')
const { slots } = require('@dinpay/encryption')

const dpCapsule = require('@dinpay/capsule')
const logger = dpCapsule.resolvePlugin('logger')
const config = dpCapsule.resolvePlugin('config')

let synctracker = null

module.exports = (block) => {
  const constants = config.getConstants(block.data.height)

  if (!synctracker) {
    synctracker = {
      starttimestamp: block.data.timestamp,
      startdate: new Date().getTime()
    }
  }

  const remainingtime = (slots.getTime() - block.data.timestamp) * (block.data.timestamp - synctracker.starttimestamp) / (new Date().getTime() - synctracker.startdate) / constants.blocktime

  if (block.data.timestamp - slots.getTime() < 8) {
    logger.printTracker('Fast Synchronisation', block.data.timestamp, slots.getTime(), human(remainingtime), 3)
  } else {
    synctracker = null
    logger.stopTracker('Fast Synchronisation', slots.getTime(), slots.getTime())
  }
}
