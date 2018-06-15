'use strict'

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'json-rpc',
  async register (dpCapsule, options) {
    const logger = dpCapsule.resolvePlugin('logger')

    if (!options.enabled) {
      logger.info('JSON-RPC Server is disabled...')

      return
    }

    logger.info('Starting JSON-RPC Server...')

    return require('./server')(options)
  },
  async deregister (dpCapsule, options) {
    if (options.enabled) {
      dpCapsule.resolvePlugin('logger').info('Stopping JSON-RPC Server...')

      return dpCapsule.resolvePlugin('json-rpc').stop()
    }
  }
}
