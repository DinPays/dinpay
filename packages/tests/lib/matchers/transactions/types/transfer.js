'use strict'

const { TRANSFER } = require('@dinpay/encryption').constants

module.exports = (received) => {
  return {
    message: () => 'Expected value to be a valid TRANSFER transaction.',
    pass: received.type === TRANSFER
  }
}
