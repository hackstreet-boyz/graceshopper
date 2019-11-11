const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  brand: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://uploads-ssl.webflow.com/56ba1ae8590c6fab210a6901/57167af6073ecab324e292e2_stock-products-cvr.jpg',
    validate: {
      isURL: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
})

Product.beforeValidate(function(user) {
  user.price = user.price * 100
  // fix  this
})
module.exports = Product
