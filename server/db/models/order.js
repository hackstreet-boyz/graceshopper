const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')
const OrderItem = require('./orderitem')

const Order = db.define('orders', {
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

// Order.beforeUpdate(async order => {
//   const items = await OrderItem.findAll({where: {orderId: order.id}})

//   const totalPrice = items.reduce((sum, item) => {
//     return sum + item.historicPrice * item.quantity
//   }, 0)
//   order.totalPrice = totalPrice
//   await order.save()
// })

Order.beforeValidate(order => {})
module.exports = Order
