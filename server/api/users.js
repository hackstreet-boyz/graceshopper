const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
const {adminGate, userAdminGate, userGate} = require('./security')

module.exports = router

router.get('/', adminGate, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', userAdminGate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email']
    })
    if (user) {
      res.send(user)
    } else {
      res.status(404).send("This user doesn't exist")
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:orderId', userGate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email'],
      include: [
        {
          model: Order,
          where: {id: req.params.orderId},
          include: {model: Product}
        }
      ]
    })
    if (user) {
      res.send(user)
    } else {
      res.status(404).send("This order doesn't exist")
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:userId/:orderId/:productId', userGate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'email'],
      include: [
        {
          model: Order,
          include: {model: Product, where: {id: req.params.productId}}
        }
      ]
    })
    if (user) {
      res.send(user)
    } else {
      res.status(404).send("This cartitem doesn't exist")
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:userId', userAdminGate, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)

    const updatedUser = await user.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone
    })
    console.log('iupdated user!!!!', updatedUser)
    res.send(updatedUser)
  } catch (error) {
    next(error)
  }
})
