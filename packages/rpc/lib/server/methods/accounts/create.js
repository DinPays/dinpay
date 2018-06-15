const Joi = require('joi')
const dinpay = require('@dinpay/encryption')

module.exports = {
  name: 'accounts.create',
  async method (params) {
    const account = dinpay.crypto.getKeys(params.passphrase)

    return {
      publicKey: account.publicKey,
      address: dinpay.crypto.getAddress(account.publicKey)
    }
  },
  schema: {
    passphrase: Joi.string().required()
  }
}
