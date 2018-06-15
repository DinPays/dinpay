'use strict'

const dpCapsule = require('@dinpay/capsule')

/**
 * Start a relay.
 * @param  {Object} options
 * @return {void}
 */
module.exports = async (options) => {
  await dpCapsule.setUp(options, {
    exclude: ['@dinpay/forging'],
    options: {
      '@dinpay/ledger': {
        networkStart: options.networkStart
      }
    }
  })
}
