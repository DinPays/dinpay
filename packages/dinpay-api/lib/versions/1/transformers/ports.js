'use strict'

/**
 * Turns a "config" object into readable object.
 * @param  {Object} model
 * @return {Object}
 */
module.exports = (config) => {
  let result = {}
  const keys = ['@dinpay/peers', '@dinpay/dinpay-api', '@dinpay/gqldb', '@dinpay/rpc', '@dinpay/webhooks']

  result[keys[0]] = config.plugins[keys[0]].port
  for (let [k, v] of Object.entries(config.plugins)) {
    if (keys.includes(k) && v.enabled) {
      if (v.server && v.server.enabled) {
        result[k] = v.server.port
        continue
      }
      result[k] = v.port
    }
  }

  return result
}
