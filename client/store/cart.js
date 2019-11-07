import axios from 'axios'

/*ACTION TYPES*/
const GOT_ITEMS_FROM_CART = 'GOT_ITEMS_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const ADD_ITEMS_TO_CART = 'ADD_ITEMS_TO_CART'

/*INITIAL STATE*/
const initialState = {items: [], item: {}}

/*ACTION CREATORS*/
const gotItemsFromCart = items => ({
  type: GOT_ITEMS_FROM_CART,
  items
})

const updateQuantity = item => ({
  type: UPDATE_QUANTITY,
  item
})

const addItemToCart = item => ({
  type: ADD_ITEMS_TO_CART,
  item
})

/*THUNKS*/
export const addItemToCartThunk = (userId, newData) => {
  return async dispatch => {
    const {data} = await axios.post(`/api/cart/${userId}`, newData)
    dispatch(addItemToCart(data))
  }
}

export const getItemsFromCart = user => {
  return async dispatch => {
    try {
      console.log('getItemsFromCart is working...')
      const {data} = await axios.get(`/api/cart/${user.id}`)
      dispatch(gotItemsFromCart(data))
      console.log('getItemsFromCart is completed')
    } catch (error) {
      console.error(error)
    }
  }
}

export const submitOrderThunk = user => {
  return async dispatch => {
    try {
      console.log('submitOrder is working...')
      await axios.put(`/api/cart/${user.id}/order`)
      const {data} = await axios.post(`/api/cart/${user.id}/order`)
      dispatch(gotItemsFromCart(data))
      console.log('submitOrder is completed')
    } catch (error) {
      console.error(error)
    }
  }
}

export const increaseQuantity = (user, item) => {
  return async dispatch => {
    try {
      const dataToSend = {
        quantity: (item.quantity += 1),
        productId: item.productId,
        orderId: item.orderId
      }
      const {data} = await axios.put(`/api/cart/${user.id}`, dataToSend)
      dispatch(updateQuantity(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const decreaseQuantity = (user, item) => {
  return async dispatch => {
    try {
      const dataToSend = {
        quantity: (item.quantity -= 1),
        productId: item.productId,
        orderId: item.orderId
      }
      const {data} = await axios.put(`/api/cart/${user.id}`, dataToSend)
      dispatch(updateQuantity(data))
    } catch (error) {
      console.error(error)
    }
  }
}

/*REDUCERS*/
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ITEMS_FROM_CART:
      return {...state, items: action.items}
    case UPDATE_QUANTITY:
      return {...state, item: action.item}
    default:
      return state
  }
}
