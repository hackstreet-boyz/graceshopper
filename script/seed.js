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
        'https://eatup.kitchen//wp-content/uploads/2017/09/Homemade-Tabasco-Sauce-04-320x321.jpg',
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
        'https://timedotcom.files.wordpress.com/2017/12/sriracha-pizza-fight-leads-to-arrest.jpg?w=600&quality=85',
      category: 'Condiments',
      stock: 100
    }),
    Product.create({
      name: 'Soy Saunce',
      price: 3.99,
      brand: 'The Hackstreets',
      description:
        'We import only the highest quality soy saunces. From the hackstreets.',
      imageUrl:
        'https://s3.amazonaws.com/jconline/jc_soysauce_general_860-560.jpg',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Hoisin Sauce',
      price: 2.99,
      brand: 'Lee Kum Kee',
      description: 'From the makers of the finest seafood sauce in the world',
      imageUrl:
        'https://www.seriouseats.com/recipes/images/2012/01/20120116-188016-hoisin-sauce.jpg',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Lao gan ma',
      price: 4.99,
      brand: 'LAOGANMA',
      description: "A classic, don't miss out on this limited time offer.",
      imageUrl:
        'https://images.food52.com/hyDzi7i-jMrrIjUD4KEmn4HIKVA=/2012x1340/0b33bd01-f865-4b0c-9ce9-6ea519af09ee--2019-0430_lao-gan-ma-chili-crisp_3x2_ty-mecham_001.jpg',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Mala sauce',
      price: 4.99,
      brand: 'Lee Kum Kee',
      description:
        'For hotpot enthusiasts, this ready-to-go sauce can be used for any occasion.',
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
    }),
    Product.create({
      name: `Halal White Sauce`,
      price: 3.99,
      brand: 'Halal',
      description: `How is it made?`,
      category: 'Cooking',
      stock: 100,
      imageUrl:
        'https://static.wixstatic.com/media/54e267_942a5a3bf70d4a159d1a30a3747f73e0~mv2.png/v1/crop/x_0,y_99,w_621,h_1018/fill/w_346,h_567,al_c,usm_0.66_1.00_0.01/54e267_942a5a3bf70d4a159d1a30a3747f73e0~mv2.png'
    }),
    Product.create({
      name: 'Hot Chicken Flavor Sauce',
      price: 3.99,
      brand: 'SamYang',
      description: 'Famously used in the spicy noodle challenge',
      category: 'Cooking',
      stock: 100,
      imageUrl:
        'https://my-test-11.slatic.net/p/f873603550fa0cca31d99d4df5830c3e.jpg'
    }),
    Product.create({
      name: 'Schezwan Sauce',
      price: 9.99,
      brand: 'McDonald',
      description: `Rick's favorite sauce that can only be obtained in his memory`,
      category: 'Cooking',
      stock: 100,
      imageUrl:
        'https://cdn.vox-cdn.com/thumbor/F_aVdFuDhjEeONnqNnVjiELDfBo=/0x0:2048x1360/1200x800/filters:focal(861x517:1187x843)/cdn.vox-cdn.com/uploads/chorus_image/image/58827379/SzechuanMcD1.0.jpg'
    }),
    Product.create({
      name: 'Cocktail Sauce',
      price: 2.69,
      brand: 'Heinz',
      imageUrl:
        'https://target.scene7.com/is/image/Target/GUEST_e0310664-1684-4d4b-a0fb-98817eeb946b?wid=588&amp;hei=588&amp;qlt=80&amp;fmt=webp',
      description:
        'Heinz Gluten-Free Original Cocktail Sauce with a great taste that the entire family is sure to love',
      category: 'Cooking',
      stock: 100
    }),
    Product.create({
      name: 'Garlic Sauce',
      price: 3.49,
      brand: 'Heinz',
      imageUrl: 'https://www.britishcornershop.co.uk/img/large/QWOP2399.jpg',
      description:
        'This tasty sauce is the perfect accompaniment to chicken and steak, and also tastes great on burgers and hot dogs. It comes in this handy top-down squeezy bottle so you can enjoy every last drop.',
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
