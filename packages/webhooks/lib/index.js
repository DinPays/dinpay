'use strict'

const webhookManager = require('./manager')
const database = require('./database')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'webhooks',
  async register (dpCapsule, options) {
    const logger = dpCapsule.resolvePlugin('logger')

    if (!options.enabled) {
      logger.info('Webhooks are disabled...')

      return
    }

    logger.info('Starting Webhooks...')

    await database.setUp(options.database)

    await webhookManager.setUp(options)

    if (options.server.enabled) {
      return require('./server')(options.server)
    } else {
      logger.info('Webhooks API is disabled...')
    }
  },
  async deregister (dpCapsule, options) {
    if (options.server.enabled) {
      dpCapsule.resolvePlugin('logger').info('Stopping Webhook API...')

      return dpCapsule.resolvePlugin('webhooks').stop()
    }
  }
}

/**
 * The database connection.
 * @type {Database}
 */
exports.database = database
