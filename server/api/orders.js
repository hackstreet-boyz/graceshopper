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
      //const guestId = ??
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

router.put('/', async (req, res, next) => {
  try {
    if (req.user) {
      res.send('Under construction')
    } else {
      const itemToUpdate = await OrderItem.update(
        {quantity: req.body.quantity},
        {
          where: {productId: req.body.productId, orderId: req.body.orderId}
        }
      )
      res.send(itemToUpdate)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    await OrderItem.destroy({
      where: {productId: req.body.productId, orderId: req.body.orderId}
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/order', async (req, res, next) => {
  try {
    const purchasedUpdate = await Order.update(
      {purchased: true},
      {
        where: {
          id: req.params.userId,
          purchased: false
        }
      }
    )
    res.send(purchasedUpdate)
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/order', async (req, res, next) => {
  try {
    const newCart = await Order.create({
      purchased: false,
      userId: req.params.userId
    })
    res.send(newCart)
  } catch (error) {
    next(error)
  }
})
