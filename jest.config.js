module.exports = {
  bail: false,
  verbose: true,
  testMatch: [
    // '**/packages/**/__tests__/**/*.test.js'
    '**/packages/base/**/__tests__/**/*.test.js',
    '**/packages/base-logger/**/__tests__/**/*.test.js',
    '**/packages/capsule/**/__tests__/**/*.test.js',
    '**/packages/core-commander/**/__tests__/**/*.test.js',
    '**/packages/dincli/**/__tests__/**/*.test.js',
    '**/packages/dindb-sequelize/**/__tests__/**/*.test.js',
    '**/packages/events/**/__tests__/**/*.test.js',
    '**/packages/gqldb/**/__tests__/**/*.test.js',
    '**/packages/launcher/**/__tests__/**/*.test.js',
    '**/packages/log-manager/**/__tests__/**/*.test.js',
    '**/packages/presets/**/__tests__/**/*.test.js',
    '**/packages/tests/**/__tests__/**/*.test.js',
    '**/packages/validation/**/__tests__/**/*.test.js',
    '**/packages/webhooks/**/__tests__/**/*.test.js'

    /* These packages `runInBand`` */

    // '**/packages/dinpay-api/**/__tests__/**/*.test.js',

    /* These packages have very long  timeouts or don't end properly */

    // '**/packages/dindb/**/__tests__/**/*.test.js',
    // '**/packages/encryption/**/__tests__/**/*.test.js',
    // '**/packages/forging/**/__tests__/**/*.test.js',
    // '**/packages/ledger/**/__tests__/**/*.test.js',
    // '**/packages/peers/**/__tests__/**/*.test.js',
    // '**/packages/rpc/**/__tests__/**/*.test.js',
    // '**/packages/tests/**/__tests__/**/*.test.js',
    // '**/packages/txhub-redis/**/__tests__/**/*.test.js',
    // '**/packages/txhub/**/__tests__/**/*.test.js',

  ],
  moduleFileExtensions: [
    'js',
    'json'
  ],
  coverageDirectory: '<rootDir>/.coverage',
  collectCoverageFrom: [
    'packages/**/lib/**/*.js',
    '!**/node_modules/**'
  ],
  watchman: false,
  setupTestFrameworkScriptFile: 'jest-extended'
}
