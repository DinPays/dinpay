const Joi = require('joi')
const dinpay = require('@dinpay/encryption')
const database = require('../../services/database')
const network = require('../../services/network')

module.exports = {
  name: 'transactions.broadcast',
  async method (params) {
    if (params.transactions) { // old way
      for (let i = 0; i < params.transactions.length; i++) {
        await network.broadcast(params.transactions[i])
      }

      return params.transactions
    }

    let transaction = await database.getObject(params.id)
    transaction = transaction || params

    if (!dinpay.crypto.verify(transaction)) {
      return {
        success: false,
        error: 'transaction does not verify',
        transaction
      }
    }

    await network.broadcast(transaction)

    return transaction
  },
  schema: {
    id: Joi.string().length(64),
    transactions: Joi.array()
  }
}
