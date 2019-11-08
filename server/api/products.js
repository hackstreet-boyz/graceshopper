const router = require('express').Router()
const Product = require('../db/models/product')
const {Order} = require('../db/models/')

router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    if (allProducts) {
      res.send(allProducts)
    } else {
      res.status(404).send('No products to show')
    }
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const singleProduct = await Product.findOne({
      where: {id: req.params.productId}
    })
    if (singleProduct) {
      res.send(singleProduct)
    } else {
      res.status(404).send('This product does not exist!')
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
