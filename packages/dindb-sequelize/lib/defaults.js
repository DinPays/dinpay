'use strict'

module.exports = {
  dialect: 'sqlite',
  storage: process.env.DINPAY_STORE || `${process.env.DINPAY_DATA_PATH}/database/${process.env.DINPAY_LEDGER_NAME}.sqlite`,
  logging: false,
  redis: {
    host: process.env.DINPAY_REDIS_SERVER || 'localhost',
    port: process.env.DINPAY_REDIS_PORT || 6379
  }
}
