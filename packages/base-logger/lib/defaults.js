'use strict'

module.exports = {
  transports: {
    console: {
      constructor: 'Console',
      options: {
        colorize: true,
        level: 'debug',
        timestamp: () => Date.now(),
        formatter: (info) => require('./formatter')(info)
      }
    },
    dailyRotate: {
      package: 'winston-daily-rotate-file',
      constructor: 'DailyRotateFile',
      options: {
        filename: process.env.DINPAY_LOG || `${process.env.DINPAY_DATA_PATH}/logs/core/${process.env.DINPAY_LEDGER_NAME}/%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        level: 'debug',
        zippedArchive: true
      }
    }
  }
}
