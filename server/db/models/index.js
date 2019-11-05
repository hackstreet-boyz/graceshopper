const User = require('./user')
const Order = require('./order')
const OrderItem = require('./orderitem')
const Product = require('./product')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Order)
Order.hasMany(OrderItem)
Product.hasMany(OrderItem)

Order.belongsTo(User) /*userId is in order table*/
OrderItem.belongsTo(Order) /*orderId is in orderitem table*/
OrderItem.belongsTo(Product) /*productId is in orderitem table*/

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
