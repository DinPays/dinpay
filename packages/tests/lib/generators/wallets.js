const assert = require('assert')
const bip39 = require('bip39')
const { client, crypto } = require('@dinpay/encryption')

module.exports = (network, quantity = 10) => {
  network = network || 'testnet'
  assert.true(['live', 'testnet'].includes(network), 'Invalid network')

  client.getConfigManager().setFromPreset('din', network)

  let wallets = {}

  for (let i = 0; i < quantity; i++) {
      const passphrase = bip39.generateMnemonic()
      const address = crypto.getAddress(crypto.getKeys(passphrase).publicKey)

      wallets[address] = passphrase
  }

  return wallets
}
