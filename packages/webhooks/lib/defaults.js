'use strict'

module.exports = {
  enabled: false,
  database: {
    dialect: 'sqlite',
    storage: `${process.env.DINPAY_DATA_PATH}/database/webhooks.sqlite`,
    logging: false
  },
  redis: {
    host: process.env.DINPAY_REDIS_SERVER || 'localhost',
    port: process.env.DINPAY_REDIS_PORT || 6379
  },
  server: {
    enabled: false,
    host: process.env.DINPAY_WH_SERVER || '0.0.0.0',
    port: process.env.DINPAY_WH_PORT || 66144,
    whitelist: ['127.0.0.1', '192.168.*'],
    pagination: {
      limit: 100,
      include: [
        '/api/webhooks'
      ]
    }
  }
}
