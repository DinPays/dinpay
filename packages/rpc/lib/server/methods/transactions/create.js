const Joi = require('joi')
const dinpay = require('@dinpay/encryption')
const database = require('../../services/database')

module.exports = {
  name: 'transactions.create',
  async method (params) {
    const transaction = dinpay
      .transactionBuilder
      .transfer()
      .sign(params.passphrase)
      .recipientId(params.recipientId)
      .amount(params.amount)
      .getStruct()

    await database.setObject(transaction.id, transaction)

    return transaction
  },
  schema: {
    amount: Joi.number().required(),
    recipientId: Joi.string().required(),
    passphrase: Joi.string().required()
  }
}
