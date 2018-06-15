'use strict'

const transactionPoolManager = require('./manager')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  alias: 'transactionPoolManager',
  async register (dpCapsule, options) {
    return transactionPoolManager
  }
}

/**
 * The interface used by concrete implementations.
 * @type {TransactionPoolInterface}
 */
exports.TransactionPoolInterface = require('./interface')
