const configLive = require('./networks/din/live.json')
const configDevnet = require('./networks/din/testnet.json')
const configTestnet = require('./networks/din/testnet.json')

/**
 * The DinConvert base.
 * @type {Number}
 */
exports.DINCONVERT = Math.pow(10, 8)

/**
 * Available transaction types.
 * @type {Object}
 */
exports.TRANSACTION_TYPES = Object.freeze({
  TRANSFER: 0,
  SECOND_SIGNATURE: 1,
  DELEGATE_REGISTRATION: 2,
  VOTE: 3,
  MULTI_SIGNATURE: 4,
  IPFS: 5,
  TIMELOCK_TRANSFER: 6,
  MULTI_PAYMENT: 7,
  DELEGATE_RESIGNATION: 8
})

/**
 * Available network configurations.
 * @type {Object}
 */
exports.CONFIGURATIONS = Object.freeze({
  DIN: {
    LIVE: configLive,
    DEVNET: configDevnet,
    TESTNET: configTestnet
  }
})
