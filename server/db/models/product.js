const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10,1),
      defaultValue: 0
    },
    brand:{
      type: Sequelize.STRING,
      allowNull: false
    },
    imageUrl:{
      type: Sequelize.STRING,
      defaultValue: https://uploads-ssl.webflow.com/56ba1ae8590c6fab210a6901/57167af6073ecab324e292e2_stock-products-cvr.jpg
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue: 0
    }

  })
  
  module.exports = User