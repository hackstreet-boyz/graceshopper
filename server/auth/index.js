const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
const {userGate} = require('../api/security')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res) => {
  res.json(req.user)
})

router.get('/me/orders', async (req, res, next) => {
  try {
    const orders = await User.findByPk(req.user.id, {
      include: [{model: Order}]
    })
    res.send(orders)
  } catch (error) {
    next(error)
  }
})

router.get('/me/orders/:orderId', async (req, res, next) => {
  try {
    const orderDetails = await User.findByPk(req.user.id, {
      include: [
        {
          model: Order,
          where: {id: req.params.orderId},
          include: {model: Product}
        }
      ]
    })
    if (orderDetails) {
      res.send(orderDetails)
    } else {
      res.status(404).send("This order doesn't exist")
    }
  } catch (error) {
    next(error)
  }
})

router.get('/me/orders/:orderId/cart/:itemId', async (req, res, next) => {
  try {
    const cartItems = await User.findByPk(req.user.id, {
      include: [
        {
          model: Order,
          where: {id: req.params.orderId},
          include: {
            model: Product,
            where: {
              id: req.params.itemId
            }
          }
        }
      ]
    })
    if (cartItems) {
      res.send(cartItems)
    } else {
      res.status(404).send("This cart item doesn't exist")
    }
  } catch (error) {
    next(error)
  }
})

router.use('/google', require('./google'))
