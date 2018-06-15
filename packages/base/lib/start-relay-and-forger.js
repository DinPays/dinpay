'use strict'

const dpCapsule = require('@dinpay/capsule')

/**
 * Start a node.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async (options) => {
  await dpCapsule.setUp(options, {
    options: {
      '@dinpay/peers': {
        networkStart: options.networkStart
      },
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
