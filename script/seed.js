'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Luis',
      address: '123 Main Street',
      email: 'luis@email.com',
      phone: '555-555-5555',
      password: '123',
      creditcard: '1234567890123456'
    }),
    User.create({
      name: 'Jake',
      address: '123 Main Street',
      email: 'jake@email.com',
      phone: '555-555-5555',
      password: '456',
      creditcard: '1234567890123456'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'TP',
      price: 100,
      brand: 'Charmin',
      description: 'soft as Charmin, just like you',
      category: 'Household',
      quantity: 100
    }),
    Product.create({
      name: 'Tissues',
      price: 100,
      brand: 'Kleenex',
      description: 'cry harder',
      category: 'Household',
      quantity: 100
    })
  ])

  const orders = await Promise.all([
    Order.create({
      userId: 1,
      purchased: false
    }),
    Order.create({
      userId: 2,
      purchased: false
    })
  ])

  const orderItems = await Promise.all([
    OrderItem.create({
      orderId: 1,
      productId: 1,
      quantity: 99
    }),
    OrderItem.create({
      orderId: 2,
      productId: 2,
      quantity: 50
    })
  ])

  console.log(
    `seeded ${users.length} users, ${products.length} products, ${
      orders.length
    } orders, and ${orderItems.length} orderItems`
  )
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
