const Sequelize = require('sequelize')
const db = require('../db')

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

Order.beforeValidate(order => {})
module.exports = Order
