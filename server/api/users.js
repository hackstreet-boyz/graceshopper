const router = require('express').Router()
const {User} = require('../db/models')
const {adminGate, userAdminGate} = require('./security')

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
      res.status(404).send('This user doesnt exist')
    }
  } catch (err) {
    next(err)
  }
})
