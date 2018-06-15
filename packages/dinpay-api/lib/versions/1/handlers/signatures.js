'use strict'

const dpCapsule = require('@dinpay/capsule')
const config = dpCapsule.resolvePlugin('config')
const blockchain = dpCapsule.resolvePlugin('blockchain')

const utils = require('../utils')

/**
 * @type {Object}
 */
exports.fee = {
  /**
   * @param  {Hapi.Request} request
   * @param  {Hapi.Toolkit} h
   * @return {Hapi.Response}
   */
  handler (request, h) {
    return utils.respondWith({
      fee: config.getConstants(blockchain.getLastBlock(true).height).fees.secondSignature
    })
  }
}
