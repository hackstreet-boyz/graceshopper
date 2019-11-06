const router = require('express').Router()
const {Order, OrderItem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      res.send(
        await Order.findAll({
          where: {purchased: false, userId: req.user.id},
          include: [{model: OrderItem}]
        })
      )
    } else {
      //const guestId = ??
      res.send(
        await Order.findAll({
          where: {purchased: false},
          include: [{model: OrderItem}]
        })
      )
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      res.send('Under construction')
    } else {
      const itemToGet = await OrderItem.findOrCreate({
        where: {productId: req.body.productId, orderId: req.body.orderId}
      })
      const item = itemToGet[0]
      await item.addItem(req.body.quantity)
      res.status(201).send(item)
    }
  } catch (error) {
    next(error)
  }
})
