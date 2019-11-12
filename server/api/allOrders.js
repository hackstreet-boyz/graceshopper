const Router = require('express').Router()
const {Order} = require('../db/models')

Router.get('/:userId', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {userId: req.params.userId, purchased: true}
    })
    res.send(userOrders)
  } catch (error) {
    next(error)
  }
})

module.exports = Router
