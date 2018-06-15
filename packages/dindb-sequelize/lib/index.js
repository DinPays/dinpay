'use strict'

const SequelizeConnection = require('./connection')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'database',
  async register (dpCapsule, options) {
    dpCapsule.resolvePlugin('logger').info('Establishing Database Connection...')

    const sequelize = new SequelizeConnection(options)

    const databaseManager = dpCapsule.resolvePlugin('databaseManager')
    await databaseManager.makeConnection(sequelize)

    return databaseManager.connection()
  },
  async deregister (dpCapsule, options) {
    dpCapsule.resolvePlugin('logger').info('Closing Database Connection...')

    return dpCapsule.resolvePlugin('database').disconnect()
  }
}
