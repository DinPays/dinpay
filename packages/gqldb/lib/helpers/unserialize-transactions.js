'use strict';

const { Transaction } = require('@dinpay/encryption').models

module.exports = async (data) => {
  return data.reduce((total, value, key) => {
    const serialized = Buffer.from(value.serialized).toString('hex')

    total.push(Transaction.deserialize(serialized))

    return total
  }, [])
}
