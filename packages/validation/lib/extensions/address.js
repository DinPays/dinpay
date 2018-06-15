module.exports = (joi) => ({
  name: 'dinAddress',
  base: joi.string().alphanum().length(34)
})
