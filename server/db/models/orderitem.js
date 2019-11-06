const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderitems', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

OrderItem.prototype.addItem = function(numAddedToCart) {
  this.update({quantity: (this.quantity += numAddedToCart)})
}

module.exports = OrderItem
