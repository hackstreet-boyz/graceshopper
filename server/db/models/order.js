const Sequelize = require('sequelize')
const db = require('../db')

// ensure that a user only has 1 existing cart, and everytthing else is a fulfilled order
const Order = db.define('orders', {
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
    // should not be null
  } // cart versus not
})

module.exports = Order
