const router = require('express').Router()
const stripe = require('stripe')('sk_test_M8ivPTWrHOd6nPUnOcGSnBrD002uOrX464')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    console.log('>>>>>>>>>>>> req.body >>>>>>>>>>>>', req.body)
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })

    res.json({status})
  } catch (err) {
    next(err)
  }
})
