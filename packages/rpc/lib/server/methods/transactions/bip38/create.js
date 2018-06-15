const Joi = require('joi')
const dinpay = require('@dinpay/encryption')
const database = require('../../../services/database')
const getBip38Keys = require('../../../utils/bip38-keys')

module.exports = {
  name: 'transactions.bip38.create',
  async method (params) {
    const account = await getBip38Keys(params.userId, params.bip38)

    const transaction = dinpay
      .transactionBuilder
      .transfer()
      .recipientId(params.recipientId)
      .amount(params.amount)
      .sign('dummy')
      .getStruct()

    transaction.senderPublicKey = account.keys.getPublicKeyBuffer().toString('hex')

    delete transaction.signature
    dinpay.crypto.sign(transaction, account.keys)
    transaction.id = dinpay.crypto.getId(transaction)

    await database.setObject(transaction.id, transaction)

    return transaction
  },
  schema: {
    amount: Joi.number().required(),
    recipientId: Joi.string().length(34).required(),
    bip38: Joi.string().required(),
    userId: Joi.string().hex().required()
  }
}
