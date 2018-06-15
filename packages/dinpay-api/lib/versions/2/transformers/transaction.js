'use strict'

const dpCapsule = require('@dinpay/capsule')
const config = dpCapsule.resolvePlugin('config')
const blockchain = dpCapsule.resolvePlugin('blockchain')

const { crypto } = require('@dinpay/encryption')
const { Transaction } = require('@dinpay/encryption').models

const formatTimestamp = require('./utils/format-timestamp')

/**
 * Turns a "transaction" object into a generic object.
 * @param  {Object} model
 * @return {Object}
 */
module.exports = (model) => {
  const data = Transaction.deserialize(model.serialized.toString('hex'))
  const lastBlock = blockchain.getLastBlock(true)

  return {
    id: data.id,
    blockId: model.blockId,
    type: data.type,
    amount: data.amount,
    fee: data.fee,
    sender: crypto.getAddress(data.senderPublicKey, config.network.pubKeyHash),
    recipient: data.recipientId,
    signature: data.signature,
    vendorField: data.vendorField,
    asset: data.asset,
    confirmations: model.block ? lastBlock.height - model.block.height : 0,
    timestamp: formatTimestamp(data.timestamp)
  }
}
