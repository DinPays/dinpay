'use strict';

const database = require('@dinpay/capsule').resolvePlugin('database')

module.exports = (_, args) => {
  return database.wallets.findById(args)
}
