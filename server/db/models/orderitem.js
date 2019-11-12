const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./product')

const OrderItem = db.define('orderitems', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  historicPrice: {
    type: Sequelize.INTEGER,
    defaultValue: null
  }
})

OrderItem.prototype.addItem = function(numAddedToCart) {
  this.update({quantity: (this.quantity += numAddedToCart)})
}

OrderItem.updateItemPrices = async function(currCartOrder) {
  const cartItems = await OrderItem.findAll({
    where: {orderId: currCartOrder.id}
  })
  let totalPrice = 0
  cartItems.forEach(async (item, idx) => {
    const product = await Product.findOne({where: {id: item.productId}})
    await item.update({historicPrice: product.price})
  })
}

module.exports = OrderItem
