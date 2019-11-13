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
      'https://www.jerkybyart.com/wp-content/uploads/2015/07/Tabasco-e1442362151667.jpg',
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
