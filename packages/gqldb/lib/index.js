'use strict';

/**
 * The struct used by the plugin manager.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'graphql',
  async register (dpCapsule, options) {
    if (!options.enabled) {
      dpCapsule.resolvePlugin('logger').info('GraphQL API is disabled...')

      return
    }

    dpCapsule.resolvePlugin('logger').info('Starting GraphQL API...')

    return require('./server')(options)
  },
  async deregister (dpCapsule, options) {
    if (options.enabled) {
      dpCapsule.resolvePlugin('logger').info('Stopping GraphQL API...')

      return dpCapsule.resolvePlugin('graphql').stop()
    }
  }
}
