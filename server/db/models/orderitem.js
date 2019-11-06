const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderitems', {
  quantity: {
    // negative items ?
    type: Sequelize.INTEGER,
    defaultValue: 0 // 1
  }
  // price on purchase to reflect order history
})

OrderItem.prototype.addItem = async function(numAddedToCart) {
  // promise issue: return this value
  await this.update({quantity: (this.quantity += numAddedToCart)})
}

module.exports = OrderItem
