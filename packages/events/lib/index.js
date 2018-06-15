'use strict'

const emitter = require('./emitter')

/**
 * The struct used by the plugin dpCapsule.
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  alias: 'event-emitter',
  async register (dpCapsule, options) {
    return emitter
  }
}
