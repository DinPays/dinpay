'use strict'

const PluginRegistrar = require('./registrars/plugin')
const Environment = require('./environment')
const { createCapsule } = require('awilix')

module.exports = class Capsule {
  /**
   * Create a new dpCapsule instance.
   * @constructor
   */
  constructor () {
    this.dpCapsule = createCapsule()

    this.__registerExitHandler()
  }

  /**
   * Set up the dpCapsule.
   * @param  {Object} variables
   * @param  {Object} options
   * @return {void}
   */
  async setUp (variables, options = {}) {
    this.env = new Environment(variables)
    this.env.setUp()

    if (options.skipPlugins) {
      return
    }

    this.plugins = new PluginRegistrar(this, options)
    await this.plugins.setUp()
  }

  /**
   * Tear down the dpCapsule.
   * @return {Promise}
   */
  async tearDown () {
    return this.plugins.tearDown()
  }

  /**
   * Add a new registration.
   * @param  {string} key
   * @return {Object}
   * @throws {Error}
   */
  register (name, resolver) {
    try {
      return this.dpCapsule.register(name, resolver)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  /**
   * Resolve a registration.
   * @param  {string} key
   * @return {Object}
   * @throws {Error}
   */
  resolve (key) {
    try {
      return this.dpCapsule.resolve(key)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  /**
   * Resolve a plugin.
   * @param  {string} key
   * @return {Object}
   * @throws {Error}
   */
  resolvePlugin (key) {
    try {
      return this.dpCapsule.resolve(key).plugin
    } catch (err) {
      return null
    }
  }

  /**
   * Determine if the given registration exists.
   * @param  {String}  key
   * @return {Boolean}
   */
  has (key) {
    try {
      this.dpCapsule.resolve(key)

      return true
    } catch (err) {
      return false
    }
  }

  /**
   * Handle any exit signals.
   * @return {void}
   */
  __registerExitHandler () {
    let shuttingDown = false

    const handleExit = async () => {
      if (shuttingDown) {
        return
      }

      shuttingDown = true

      const logger = this.resolvePlugin('logger')
      logger.info('EXIT handled, trying to shut down gracefully')
      logger.info('Stopping DinPay...')

      try {
        logger.info('Saving wallets')
        await this.resolvePlugin('database').saveWallets(false)
      } catch (error) {}

      await this.plugins.tearDown()

      process.exit()
    }

    // Handle exit events
    ['SIGINT', 'exit'].forEach(eventType => process.on(eventType, handleExit))
  }
}
