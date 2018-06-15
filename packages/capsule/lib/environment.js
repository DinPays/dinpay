'use strict'

const fs = require('fs-extra')
const path = require('path')
const expandHomeDir = require('expand-home-dir')
const { NetworkManager } = require('@dinpay/encryption')

module.exports = class Environment {
  /**
   * Create a new environment instance.
   * @param  {Object} variables
   * @return {void}
   */
  constructor (variables) {
    this.variables = variables
  }

  /**
   * Set up the environment variables.
   */
  setUp () {
    this.__exportPaths()
    this.__exportNetwork()
    this.__exportVariables()
  }

  /**
   * Export all path variables for the core environment.
   * @return {void}
   */
  __exportPaths () {
    const allowedKeys = ['config', 'data']

    for (let [key, value] of Object.entries(this.variables)) {
      if (allowedKeys.includes(key)) {
        process.env[`DINPAY_PATH_${key.toUpperCase()}`] = path.resolve(expandHomeDir(value))
      }
    }
  }

  /**
   * Export all network variables for the core environment.
   * @return {void}
   */
  __exportNetwork () {
    let config

    if (this.variables.token && this.variables.network) {
      config = NetworkManager.findByName(this.variables.network, this.variables.token)
    } else {
      try {
        const networkPath = path.resolve(expandHomeDir(`${process.env.DINPAY_PRESET_PATH}/network.json`))

        config = require(networkPath)
      } catch (error) {}
    }

    if (!config) {
      throw new Error('An invalid network configuration was provided or is inaccessible due to it\'s security settings.')
      process.exit(1) // eslint-disable-line no-unreachable
    }

    process.env.DINPAY_LEDGER = JSON.stringify(config)
    process.env.DINPAY_LEDGER_NAME = config.name
  }

  /**
   * Export all additional variables for the core environment.
   * @return {void}
   */
  __exportVariables () {
    const envPath = expandHomeDir(`${process.env.DINPAY_DATA_PATH}/.env`)

    if (fs.existsSync(envPath)) {
      const env = require('envfile').parseFileSync(envPath)

      Object.keys(env).forEach(key => (process.env[key] = env[key]))
    }
  }
}
