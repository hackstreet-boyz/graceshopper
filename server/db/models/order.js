const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const Order = db.define('orders', {
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNul: true
  }
})

Order.beforeValidate(order => {})
module.exports = Order
