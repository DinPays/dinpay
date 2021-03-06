const path = require('path')
const fs = require('fs')
const semver = require('semver')
const isString = require('lodash/isString')
const expandHomeDir = require('expand-home-dir')
const Hoek = require('hoek')
const { asValue } = require('awilix')

module.exports = class PluginRegistrars {
  /**
   * Create a new plugin manager instance.
   * @param  {Capsule} dpCapsule
   * @param  {Object} options
   */
  constructor (dpCapsule, options = {}) {
    this.dpCapsule = dpCapsule
    this.plugins = this.__loadPlugins()
    this.options = options
    this.deregister = []
  }

  /**
   * Set up all available plugins.
   * @return {void}
   */
  async setUp () {
    for (const [name, options] of Object.entries(this.plugins)) {
      await this.register(name, options)

      if (this.options.exit && this.options.exit === name) {
        break
      }
    }
  }

  /**
   * Deregister all plugins.
   * @return {void}
   */
  async tearDown () {
    const plugins = this.deregister.reverse()

    for (let i = 0; i < plugins.length; i++) {
      await plugins[i].plugin.deregister(this.dpCapsule, plugins[i].options)
    }
  }

  /**
   * Register a plugin.
   * @param  {String} name
   * @param  {Object} options
   * @return {void}
   */
  async register (name, options = {}) {
    if (!this.__shouldBeRegistered(name)) {
      return
    }

    if (this.plugins[name]) {
      options = Hoek.applyToDefaults(this.plugins[name], options)
    }

    return this.__registerWithCapsule(name, options)
  }

  /**
   * Register a plugin.
   * @param  {Object} plugin
   * @param  {Object} options
   * @return {void}
   */
  async __registerWithCapsule (plugin, options = {}) {
    let item = this.__resolve(plugin)

    if (!item.plugin.register) {
      return
    }

    const name = item.plugin.name || item.plugin.pkg.name
    const version = item.plugin.version || item.plugin.pkg.version
    const defaults = item.plugin.defaults || item.plugin.pkg.defaults
    const alias = item.plugin.alias || item.plugin.pkg.alias

    if (!semver.valid(version)) {
      throw new Error(`The plugin "${name}" provided an invalid version "${version}". Please check https://semver.org/ and make sure you follow the spec.`)
    }

    if (defaults) {
      options = Hoek.applyToDefaults(defaults, options)
    }

    if (this.options.options && this.options.options.hasOwnProperty(name)) {
      options = Hoek.applyToDefaults(options, this.options.options[name])
    }

    plugin = await item.plugin.register(this.dpCapsule, options || {})
    this.dpCapsule.register(alias || name, asValue({ name, version, plugin, options }))

    if (item.plugin.hasOwnProperty('deregister')) {
      this.deregister.push({ plugin: item.plugin, options })
    }
  }

  /**
   * Resolve a plugin instance.
   * @param  {(String|Object)} plugin
   * @return {Object}
   */
  __resolve (plugin) {
    let item

    if (isString(plugin)) {
      if (!plugin.startsWith('@')) {
        plugin = path.resolve(plugin)
      }

      try {
        item = require(plugin)
      } catch (error) {
        console.log(error)
      }

      if (!item.plugin) {
        item = { plugin: item }
      }
    }

    return item
  }

  /**
   * Determine if the given plugin should be registered.
   * @param  {String} name
   * @return {Boolean}
   */
  __shouldBeRegistered (name) {
    let register = true

    if (this.options.include) {
      register = this.options.include.includes(name)
    }

    if (this.options.exclude) {
      register = !this.options.exclude.includes(name)
    }

    return register
  }

  /**
   * Load plugins from any of the available files.
   * @return {[Object|void]}
   */
  __loadPlugins () {
    const primary = path.resolve(expandHomeDir(`${process.env.DINPAY_PRESET_PATH}/plugins.js`))

    if (fs.existsSync(primary)) {
      return require(primary)
    }

    const secondary = path.resolve(expandHomeDir(`${process.env.DINPAY_PRESET_PATH}/plugins.json`))

    if (fs.existsSync(secondary)) {
      return require(secondary)
    }

    throw new Error('An invalid configuration was provided or is inaccessible due to it\'s security settings.')
    process.exit(1) // eslint-disable-line no-unreachable
  }
}
