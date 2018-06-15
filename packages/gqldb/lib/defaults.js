'use strict';

module.exports = {
  enabled: false,
  host: process.env.DINPAY_GQL_SERVER || '0.0.0.0',
  port: process.env.DINPAY_GQL_PORT || 66145,
  path: '/graphql',
  graphiql: true
}
