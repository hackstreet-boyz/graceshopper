const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    // count in pennies, INTEGER
    type: Sequelize.DECIMAL(10, 1),
    defaultValue: 0
  },
  brand: {
    // seller: maybe a table?
    // get rid of it
    // enum, is in
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    // isUrl
    type: Sequelize.STRING,
    defaultValue:
      'https://uploads-ssl.webflow.com/56ba1ae8590c6fab210a6901/57167af6073ecab324e292e2_stock-products-cvr.jpg'
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    // same idea - possibly including a group of them that you can keep track of
    type: Sequelize.STRING,
    allowNull: false
  },
  quantity: {
    // negative - raise a minimum, raise a maximum
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
})

module.exports = Product
