'use strict'

const ForgerManager = require('./manager')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'forger',
  async register (dpCapsule, options) {
    const forgerManager = await new ForgerManager(options)

    const forgers = await forgerManager.loadDelegates(options.bip38, options.password)

    dpCapsule.resolvePlugin('logger').info(`ForgerManager started with ${forgers.length} forgers`)

    forgerManager.startForging()

    return forgerManager
  }
}
