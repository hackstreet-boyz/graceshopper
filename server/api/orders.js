const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    res.send(
      await Order.findAll({
        where: {purchased: false},
        include: [{model: OrderItem}]
      })
    )
  } catch (error) {
    next(error)
  }
})
