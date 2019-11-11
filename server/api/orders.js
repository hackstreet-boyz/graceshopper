const router = require('express').Router()
const {Order, OrderItem, Product} = require('../db/models')
const {userGate} = require('./security')
module.exports = router

router.get('/:userId', async (req, res, next) => {
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

router.post('/:userId', userGate, async (req, res, next) => {
  try {
    // const currCartOrder = await Order.findOne({
    //   where: {userId: req.params.userId, purchased: false}
    // })
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

router.put('/:userId', userGate, async (req, res, next) => {
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

router.delete('/:userId', userGate, async (req, res, next) => {
  try {
    await OrderItem.destroy({
      where: {productId: req.body.productId, orderId: req.body.orderId}
    })
    res.status(201).send()
  } catch (error) {
    next(error)
  }
})

router.put('/:userId/order', userGate, async (req, res, next) => {
  try {
    // const orderProducts = await Order.findAll({
    //   where: {
    //     userId: req.params.userId,
    //     purchased: false
    //   },
    //   include: [{model: Product}]
    // // })
    // const currOrder = await Order.findOne({where: {userId: req.params.userId, purchased: false}})
    // const orderItems = await OrderItem.findAll({where: {orderId: currOrder.id}})
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

router.post('/:userId/order', userGate, async (req, res, next) => {
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
