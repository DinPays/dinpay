'use strict'

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'api',
  async register (dpCapsule, options) {
    if (!options.enabled) {
      dpCapsule.resolvePlugin('logger').info('Public API is disabled...')

      return
    }

    dpCapsule.resolvePlugin('logger').info('Starting Public API...')

    return require('./server')(options)
  },
  async deregister (dpCapsule, options) {
    if (options.enabled) {
      dpCapsule.resolvePlugin('logger').info('Stopping Public API...')

      return dpCapsule.resolvePlugin('api').stop()
    }
  }
}
