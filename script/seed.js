'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderItem} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Luis',
      lastName: 'Bello',
      address: '123 Main Street',
      email: 'luis@email.com',
      phone: '555-555-5555',
      password: '123',
      creditcard: '1234567890123456'
    }),
    User.create({
      firstName: 'Jake',
      lastName: 'Roth',
      address: '123 Main Street',
      email: 'jake@email.com',
      phone: '555-555-5555',
      password: '456',
      creditcard: '1234567890123456'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Tabasco',
      price: 2,
      brand: 'Tabasco Factories Unlimited',
      description: 'Not so hot, but very tasty!',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81JsHMUAe1L._SL1500_.jpg',
      category: 'Condiments',
      stock: 100
    }),
    Product.create({
      name: 'Sriracha',
      price: 4.5,
      brand: 'Huy Fong Foods',
      description:
        "Made in eastern Thailand, it's the finest hot sauce in the world",
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/71Jsiqz0aiL._SX569_.jpg',
      category: 'Condiments',
      stock: 100
    }),
    Product.create({
      name: 'Soy Saunce',
      price: 3.99,
      brand: 'Kikkoman Sauces',
      description: 'I want it that way',
      imageUrl:
        'https://duetogsaij514.cloudfront.net/images/products/4/LN_034687_BP_4.jpg',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Hoisin Sauce',
      price: 2.99,
      brand: 'Lee Kum Kee',
      description: 'Show me the meaning of being lonely',
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/81uTQEEW1VL._SY550_.jpg',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Lao gan ma',
      price: 4.99,
      brand: 'LAOGANMA',
      description: "Oh my god we're back again",
      imageUrl:
        'https://images.food52.com/hyDzi7i-jMrrIjUD4KEmn4HIKVA=/2012x1340/0b33bd01-f865-4b0c-9ce9-6ea519af09ee--2019-0430_lao-gan-ma-chili-crisp_3x2_ty-mecham_001.jpg',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Mala sauce',
      price: 4.99,
      brand: 'Lee Kum Kee',
      description: 'As long as you love me',
      imageUrl:
        'https://i1.wp.com/blog.themalamarket.com/wp-content/uploads/2018/02/home-hotpot-20.jpg?resize=1000%2C750&ssl=1',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Baba Ghanoush',
      price: 3.99,
      brand: 'Luis Falafel Boys',
      description: 'The best baba in town. Get it today before it runs out!',
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-190605-babaghanoush-308-landscape-pf-1560443633.jpg?crop=0.668xw:1.00xh;0.0884xw,0.00255xh&resize=980:*',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Garlic Hummus',
      price: 1.99,
      brand: 'Sabra',
      imageUrl:
        'https://www.seriouseats.com/recipes/images/2016/03/20160411-tahini-sauce-hummus-vegan-19-1500x1125.jpg',
      description: '',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Chimichurri',
      price: 11.99,
      brand: 'Gardels',
      imageUrl:
        'https://www.cookingclassy.com/wp-content/uploads/2019/06/chimichurri-14.jpg',
      description: '',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Tartar',
      price: 23.23,
      brand: 'Kraft',
      imageUrl:
        'https://www.foodiecrush.com/wp-content/uploads/2019/05/Tartar-Sauce-foodiecrush.com-026.jpg',
      description: '',
      category: 'Cooking',
      stock: 100
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
      quantity: 3
    }),
    OrderItem.create({
      orderId: 1,
      productId: 2,
      quantity: 5
    }),
    OrderItem.create({
      orderId: 1,
      productId: 3,
      quantity: 1
    }),
    OrderItem.create({
      orderId: 1,
      productId: 4,
      quantity: 2
    }),
    OrderItem.create({
      orderId: 1,
      productId: 5,
      quantity: 1
    }),
    OrderItem.create({
      orderId: 2,
      productId: 2,
      quantity: 1
    }),
    OrderItem.create({
      orderId: 2,
      productId: 4,
      quantity: 2
    }),
    OrderItem.create({
      orderId: 2,
      productId: 6,
      quantity: 3
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
