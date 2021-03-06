'use strict'

const { SECOND_SIGNATURE } = require('@dinpay/encryption').constants

module.exports = (received) => {
  return {
    message: () => 'Expected value to be a valid SECOND_SIGNATURE transaction.',
    pass: received.type === SECOND_SIGNATURE
  }
}
