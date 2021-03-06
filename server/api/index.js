const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/cart', require('./orders'))
router.use('/orders', require('./allOrders'))
router.use('/products', require('./products'))
router.use('/charge', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
