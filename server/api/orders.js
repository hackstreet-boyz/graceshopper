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
      const newOrderItems = [...req.user.orderitems]

      const order = await Order.findOne({
        include: [{model: OrderItem}],
        where: {id: this.orderitems.orderId}
      })

      if (!order) {
        const newItem = await OrderItem.create(req.body)
        newOrderItems.push(newItem)
        req.user.orderitems = newOrderItems
      } else {
        // order.orderitems.addItem()
      }
    } else {
      // const postedOrderId = req.body.orderId
      // const orderToGet = await Order.findOne({
      //   where: {id: postedOrderId},
      //   include: [{model: OrderItem}]
      // })

      // const cart = [...orderToGet.orderitems]

      const itemToGet = await OrderItem.findOrCreate({
        where: {productId: req.body.productId}
      })

      const item = itemToGet[0]
      const isNewItem = itemToGet[1]

      if (!isNewItem) {
        await item.addItem()
      }
      res.send(item)
    }
  } catch (error) {
    next(error)
  }
})
