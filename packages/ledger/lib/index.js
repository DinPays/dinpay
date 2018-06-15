'use strict'

const Blockchain = require('./blockchain')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  alias: 'blockchain',
  async register (dpCapsule, options) {
    const blockchain = new Blockchain(dpCapsule.resolvePlugin('config'), options.networkStart)

    if (!process.env.DINPAY_SKIP_BLOCKCHAIN) {
      await blockchain.start()
    }

    return blockchain
  }
}
