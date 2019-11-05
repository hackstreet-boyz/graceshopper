const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderitems', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = OrderItem
