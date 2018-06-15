'use strict'

const dpCapsule = require('@dinpay/capsule')

/**
 * Start a forger.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async (options) => {
  await dpCapsule.setUp(options, {
    include: [
      '@dinpay/events',
      '@dinpay/presets',
      '@dinpay/log-manager',
      '@dinpay/base-logger',
      '@dinpay/forging'
    ],
    options: {
      '@dinpay/ledger': {
        networkStart: options.networkStart
      },
      '@dinpay/forging': {
        bip38: options.bip38,
        address: options.address,
        password: options.password
      }
    }
  })
}
