'use strict';

const database = require('@dinpay/capsule').resolvePlugin('database')
const { formatOrderBy } = require('../../../helpers')

module.exports = (_, args) => {
  const { orderBy, filter, ...params } = args

  const order = formatOrderBy(orderBy, 'height:DESC')

  return database.blocks.findAll({ ...filter, orderBy: order, ...params }, false)
}
