import axios from 'axios'
import {combineReducers} from 'redux'

//action types

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

const gotAllProducts = allProducts => {
  return {
    type: GOT_ALL_PRODUCTS,
    allProducts
  }
}

const gotSingleProduct = singleProduct => {
  return {
    type: GOT_SINGLE_PRODUCT,
    singleProduct
  }
}

export const getAllProductsThunk = () => {
  return async dispatch => {
    const {data} = await axios.get('/api/products')
    dispatch(gotAllProducts(data))
  }
}

export const getSingleProductThunk = id => {
  return async dispatch => {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(gotSingleProduct(data))
  }
}

const allProductsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return action.allProducts
    default:
      return state
  }
}

const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}

export default combineReducers({
  allProducts: allProductsReducer,
  singleProduct: singleProductReducer
})
