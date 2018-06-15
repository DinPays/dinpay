'use strict'

const RedisConnection = require('./connection')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'transactionPool',
  async register (dpCapsule, options) {
    dpCapsule.resolvePlugin('logger').info('Connecting to transaction pool...')

    const transactionPoolManager = dpCapsule.resolvePlugin('transactionPoolManager')
    await transactionPoolManager.makeConnection(new RedisConnection(options))

    return transactionPoolManager.connection()
  },
  async deregister (dpCapsule, options) {
    dpCapsule.resolvePlugin('logger').info('Disconnecting from transaction pool...')

    return dpCapsule.resolvePlugin('transactionPool').disconnect()
  }
}
