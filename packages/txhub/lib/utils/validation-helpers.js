'use strict'
const dpCapsule = require('@dinpay/capsule')
const bs58check = require('bs58check')
const { configManager } = require('@dinpay/encryption')
const logger = dpCapsule.resolvePlugin('logger')
const database = dpCapsule.resolvePlugin('database')

module.exports = {
  /** Gets the blockchain wallet and checks if transaction can be applied - before returning it to forger.
   * @param {Transaction}
   * @return {Boolean}
   */
  canApplyToBlockchain: (transaction) => {
    const wallet = database.walletManager.getWalletByPublicKey(transaction.senderPublicKey)

    return wallet.canApply(transaction)
  },

  /** Checks if transaction recipient is on the same network as blockchain
   * @param {Transaction}
   * @return {Boolean}
   */
  isRecipientOnActiveNetwork: (transaction) => {
    const recipientPrefix = bs58check.decode(transaction.recipientId).readUInt8(0)
    if (recipientPrefix === configManager.get('pubKeyHash')) {
      return true
    }
    logger.error(`Recipient ${transaction.recipientId} in not on the same network: ${configManager.get('pubKeyHash')}`)
    return false
  }
}