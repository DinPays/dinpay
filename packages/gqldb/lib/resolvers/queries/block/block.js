'use strict';

const database = require('@dinpay/capsule').resolvePlugin('database')

module.exports = (_, { id }) => database.blocks.findById(id)
