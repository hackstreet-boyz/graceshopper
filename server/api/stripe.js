const router = require('express').Router()
const stripe = require('stripe')('sk_test_M8ivPTWrHOd6nPUnOcGSnBrD002uOrX464')
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
