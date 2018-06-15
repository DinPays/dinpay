'use strict'

const dpCapsule = require('@dinpay/capsule')

/**
 * Create a snapshot.
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
      '@dinpay/dindb',
      '@dinpay/dindb-sequelize',
      '@dinpay/ledger'
    ],
    options: {
      '@dinpay/ledger': {
        networkStart: options.networkStart
      }
    }
  })

  dpCapsule.resolvePlugin('database').snapshot()
}
