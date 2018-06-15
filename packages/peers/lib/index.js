'use strict'

const PeerManager = require('./manager')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults'),
  alias: 'p2p',
  async register (dpCapsule, options) {
    dpCapsule.resolvePlugin('logger').info('Starting P2P Interface...')

    const p2p = new PeerManager(options)
    await p2p.start()

    return p2p
  },
  async deregister (dpCapsule, options) {
    dpCapsule.resolvePlugin('logger').info('Stopping P2P Interface...')

    return dpCapsule.resolvePlugin('p2p').stop()
  }
}
