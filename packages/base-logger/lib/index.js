'use strict'

const WinstonDriver = require('./driver')

/**
 * The struct used by the plugin dpCapsule.
 * @type {WinstonDriver}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'logger',
  async register (dpCapsule, options) {
    const logManager = dpCapsule.resolvePlugin('logManager')
    await logManager.makeDriver(new WinstonDriver(options))

    return logManager.driver()
  }
}

/**
 * Expose the winston formatter for configuration.
 * @type {Function}
 */
exports.formatter = require('./formatter')
