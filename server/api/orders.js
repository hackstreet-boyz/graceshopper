const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      res.send(
        await Order.findAll({
          where: {purchased: false, userId: req.user.id},
          include: [{model: Product}]
        })
      )
    } else {
      res.send(
        await Order.findAll({
          where: {purchased: false},
          include: [{model: Product}]
        })
      )
    }
  } catch (error) {
    next(error)
  }
})

router.post('/:userId', async (req, res, next) => {
  try {
    const itemToGet = await OrderItem.findOrCreate({
      where: {productId: req.body.productId, orderId: req.body.orderId}
    })
    const item = itemToGet[0]
    await item.addItem(req.body.quantity)
    res.status(201).send(item)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const itemToUpdate = await OrderItem.update(
      {quantity: req.body.quantity},
      {
        where: {productId: req.body.productId, orderId: req.body.orderId}
      }
    )
    res.send(itemToUpdate)
  } catch (error) {
    next(error)
  }
})
