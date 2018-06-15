module.exports = (joi) => ({
  name: 'dinPubKey',
  base: joi.string().hex().length(66)
})
