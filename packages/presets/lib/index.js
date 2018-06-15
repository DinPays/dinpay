'use strict'

const { client } = require('@dinpay/encryption')
const loader = require('./loader')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  alias: 'config',
  async register (dpCapsule, options) {
    const config = await loader.setUp(options)

    client.setConfig(config.network)

    return config
  }
}
