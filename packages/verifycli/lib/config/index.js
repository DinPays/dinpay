'use strict'

const config = {
  baseUrlApi: 'http://localhost:66143',
  baseUrlP2P: 'http://localhost:66140',
  passphrase: 'prison tobacco acquire stone dignity palace note decade they current lesson robot',
  secondPassPhrase: '',
  publicKeyHash: 23,
  requestHeaders: {
    nethash: 'd9acd04bde4234a81addb8482333b4ac906bed7be5a9970ce8ada428bd083192',
    version: '1.0.1',
    port: 66140
  },
  transactionWaitDelay: 15
}

require('dinpayjs').crypto.setNetworkVersion(config.publicKeyHash)

module.exports = config
