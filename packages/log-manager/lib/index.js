'use strict'

const logManager = require('./manager')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  alias: 'logManager',
  async register (dpCapsule, options) {
    return logManager
  }
}

/**
 * The interface used by concrete implementations.
 * @type {LoggerInterface}
 */
exports.LoggerInterface = require('./interface')
