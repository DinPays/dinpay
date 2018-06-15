'use strict'

const databaseManager = require('./manager')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'databaseManager',
  async register (dpCapsule, options) {
    dpCapsule.resolvePlugin('logger').info('Starting Database Manager...')

    return databaseManager
  }
}

/**
 * The interface used by concrete implementations.
 * @type {ConnectionInterface}
 */
exports.ConnectionInterface = require('./interface')

/**
 * The Wallet Manager.
 * @type {WalletManager}
 */
exports.WalletManager = require('./wallet-manager')
