const bip38 = require('bip38')
const wif = require('wif')
const { createHash } = require('crypto')
const otplib = require('otplib')
const forge = require('node-forge')

const Block = require('./block')
const ECPair = require('../crypto/ecpair')
const crypto = require('../crypto/crypto')
const sortTransactions = require('../utils/sort-transactions')

/**
 * TODO copy some parts to DinPayDocs
 * @classdesc The delegate model
 *
 * The Delegate model does not store anything on db, but the object contains:
 *   - network
 *   - keySize
 *   - iterations (used for generating the cypher)
 *   - publicKey
 *   - address
 *   - keys
 *   - otpSecret
 *   - bip38
 */
module.exports = class Delegate {
  /**
   * @constructor
   * @param  {String} passphrase
   * @param  {Number} network
   * @param  {String} password
   */
  constructor (passphrase, network, password) {
    this.network = network
    this.keySize = 32 // AES-256
    this.iterations = 5000

    if (bip38.verify(passphrase)) {
      try {
        this.keys = Delegate.decryptPassphrase(passphrase, network, password)
        this.publicKey = this.keys.getPublicKeyBuffer().toString('hex')
        this.address = this.keys.getAddress(network.pubKeyHash)
        this.otpSecret = otplib.authenticator.generateSecret()
        this.bip38 = true
        this.encryptKeysWithOtp()
      } catch (error) {
        this.publicKey = null
        this.keys = null
        this.address = null
      }
    } else {
      this.keys = crypto.getKeys(passphrase)
      this.publicKey = this.keys.publicKey
      this.address = this.keys.getAddress(network.pubKeyHash)
    }
  }

  /**
   * BIP38 encrypt passphrase.
   * @param  {String} passphrase
   * @param  {Number} network
   * @param  {String} password
   * @return {String}
   * @static
   */
  static encryptPassphrase (passphrase, network, password) {
    const keys = crypto.getKeys(passphrase, network)
    const wifKey = keys.toWIF()
    const decoded = wif.decode(wifKey)

    return bip38.encrypt(decoded.privateKey, decoded.compressed, password)
  }

  /**
   * BIP38 decrypt passphrase keys.
   * @param  {String} passphrase
   * @param  {Number} network
   * @param  {String} password
   * @return {ECPair}
   * @static
   */
  static decryptPassphrase (passphrase, network, password) {
    const decryptedWif = bip38.decrypt(passphrase, password)
    const wifKey = wif.encode(network.wif, decryptedWif.privateKey, decryptedWif.compressed)

    let keys = ECPair.fromWIF(wifKey, network)
    keys.publicKey = keys.getPublicKeyBuffer().toString('hex')

    return keys
  }

  /**
   * Encrypt keys with one time password - used to store encrypted in memory.
   */
  encryptKeysWithOtp () {
    this.otp = otplib.authenticator.generate(this.otpSecret)
    this.encryptedKeys = this.__encryptData(this.keys.toWIF(), this.otp)
    this.keys = null
  }

  /**
   * Decrypt keys with one time password.
   */
  decryptKeysWithOtp () {
    let wifKey = this.__decryptData(this.encryptedKeys, this.otp)
    this.keys = ECPair.fromWIF(wifKey, this.network)
    this.keys.publicKey = this.keys.getPublicKeyBuffer().toString('hex')
    this.otp = null
    this.encryptedKeys = null
  }

  /**
   * Forge block - we consider transactions are signed, verified and unique.
   * @param  {Transaction[]} transactions
   * @param  {Object} options
   * @return {(Block|undefined)}
   */
  forge (transactions, options) {
    if (!options.version && (this.encryptedKeys || !this.bip38)) {
      const transactionData = {
        amount: 0,
        fee: 0,
        sha256: createHash('sha256')
      }

      const sortedTransactions = sortTransactions(transactions)
      sortedTransactions.forEach(transaction => {
        transactionData.amount += transaction.amount
        transactionData.fee += transaction.fee
        transactionData.sha256.update(Buffer.from(transaction.id, 'hex'))
      })

      const data = {
        version: 0,
        generatorPublicKey: this.publicKey,
        timestamp: options.timestamp,
        previousBlock: options.previousBlock.id,
        previousBlockHex: options.previousBlock.idHex,
        height: options.previousBlock.height + 1,
        numberOfTransactions: sortedTransactions.length,
        totalAmount: transactionData.amount,
        totalFee: transactionData.fee,
        reward: options.reward,
        payloadLength: 32 * sortedTransactions.length,
        payloadHash: transactionData.sha256.digest().toString('hex'),
        transactions: sortedTransactions
      }

      if (this.bip38) {
        this.decryptKeysWithOtp()
      }

      let block = Block.create(data, this.keys)

      if (this.bip38) {
        this.encryptKeysWithOtp()
      }

      return block
    }
  }

  /**
   * Perform OTP encryption.
   * @param  {String} content
   * @param  {String} password
   * @return {String}
   */
  __encryptData (content, password) {
    let derivedKey = forge.pkcs5.pbkdf2(password, this.otpSecret, this.iterations, this.keySize)
    let cipher = forge.cipher.createCipher('AES-CBC', derivedKey)
    cipher.start({ iv: forge.util.decode64(this.otp) })
    cipher.update(forge.util.createBuffer(content))
    cipher.finish()

    return forge.util.encode64(cipher.output.getBytes())
  }

  /**
   * Perform OTP decryption.
   * @param  {String} cipherText
   * @param  {String} password
   * @return {String}
   */
  __decryptData (cipherText, password) {
    let derivedKey = forge.pkcs5.pbkdf2(password, this.otpSecret, this.iterations, this.keySize)
    let decipher = forge.cipher.createDecipher('AES-CBC', derivedKey)
    decipher.start({ iv: forge.util.decode64(this.otp) })
    decipher.update(forge.util.createBuffer(forge.util.decode64(cipherText)))
    decipher.finish()

    return decipher.output.toString()
  }
}
