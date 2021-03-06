const router = require('express').Router()
if (process.env.NODE_ENV !== 'production') require('../../secrets')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
module.exports = router
const uuid = require('uuid/v4')

router.post('/', async (req, res, next) => {
  console.log('>>>>>>>>>>>> req.body >>>>>>>>>>>>', req.body)
  let status
  let err
  try {
    const {token, product} = req.body
    const customer = await stripe.customers.create({
      source: token.id
    })
    const idempotencyKey = uuid() //makes sure user isn't charged twice

    const charge = await stripe.charges.create(
      {
        amount: product.price,
        currency: 'usd',
        customer: customer.id,
        description: 'An example charge'
      },
      {idempotencyKey}
    )
    console.log('Successful charge:', {charge})
    status = 'success'
  } catch (err) {
    console.error('Unsuccessful charge:', err)
    status = 'failure'
  }
  res.json({err, status})
})
