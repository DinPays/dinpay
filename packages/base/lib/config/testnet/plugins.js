module.exports = {
  '@dinpay/events': {},
  '@dinpay/presets': {},
  '@dinpay/log-manager': {},
  '@dinpay/base-logger': {
    transports: {
      console: {
        options: {
          colorize: true,
          level: 'debug'
        }
      },
      dailyRotate: {
        options: {
          filename: process.env.DINPAY_LOG || `${process.env.DINPAY_DATA_PATH}/logs/core/${process.env.DINPAY_LEDGER_NAME}/%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          level: 'debug',
          zippedArchive: true
        }
      }
    }
  },
  '@dinpay/dindb': {
    snapshots: `${process.env.DINPAY_DATA_PATH}/snapshots/${process.env.DINPAY_LEDGER_NAME}`
  },
  '@dinpay/dindb-sequelize': {
    dialect: 'sqlite',
    storage: process.env.DINPAY_STORE || `${process.env.DINPAY_DATA_PATH}/database/${process.env.DINPAY_LEDGER_NAME}.sqlite`,
    // host: process.env.DINPAY_DB_HOST || 'localhost',
    // dialect: process.env.DINPAY_DB_LANG || 'postgres',
    // username: process.env.DINPAY_DB_USER || 'dinpay',
    // password: process.env.DINPAY_DB_PASS || 'password',
    // database: process.env.DINPAY_DB || 'dinpay_testnet',
    logging: false,
    redis: {
      host: process.env.DINPAY_REDIS_SERVER || 'localhost',
      port: process.env.DINPAY_REDIS_PORT || 6379
    }
  },
  '@dinpay/txhub': {},
  '@dinpay/txhub-redis': {
    enabled: true,
    key: 'dinpay-testnet',
    maxTransactionsPerSender: 100,
    whitelist: ['03d7dfe44e771039334f4712fb95ad355254f674c8f5d286503199157b7bf7c357'],
    redis: {
      host: process.env.DINPAY_REDIS_SERVER || 'localhost',
      port: process.env.DINPAY_REDIS_PORT || 6379
    }
  },
  '@dinpay/peers': {
    host: process.env.DINPAY_PEER_SERVER || '0.0.0.0',
    port: process.env.DINPAY_PEER_PORT || 66142
  },
  '@dinpay/ledger': {},
  '@dinpay/dinpay-api': {
    enabled: true,
    host: process.env.DINPAY_API_SERVER || '0.0.0.0',
    port: process.env.DINPAY_API_PORT || 66143,
    whitelist: ['*']
  },
  '@dinpay/webhooks': {
    enabled: true,
    database: {
      dialect: 'sqlite',
      storage: `${process.env.DINPAY_DATA_PATH}/database/${process.env.DINPAY_LEDGER_NAME}/webhooks.sqlite`,
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
      whitelist: ['127.0.0.1', '192.168.*']
    }
  },
  '@dinpay/gqldb': {
    enabled: true,
    host: process.env.DINPAY_GQL_SERVER || '0.0.0.0',
    port: process.env.DINPAY_GQL_PORT || 66145,
    path: '/graphql',
    graphiql: true
  },
  '@dinpay/forging': {
    host: 'http://127.0.0.1'
  },
  '@dinpay/rpc': {
    enabled: true,
    port: process.env.DINPAY_RPC_PORT || 8080,
    allowRemote: true,
    whitelist: ['127.0.0.1', '192.168.*']
  }
}
