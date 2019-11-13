import axios from 'axios'

/*ACTION TYPES*/
const GOT_ITEMS_FROM_CART = 'GOT_ITEMS_FROM_CART'
const UPDATE_QUANTITY = 'UPDATE_QUANTITY'
const ADD_ITEMS_TO_CART = 'ADD_ITEMS_TO_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

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

const removeItemFromCart = item => ({
  type: REMOVE_ITEM,
  item
})

/*THUNKS*/
export const addItemToCartThunk = (userId, newData) => {
  return async dispatch => {
    console.log('thunk is about to start thunking')
    const {data} = await axios.post(`/api/cart/${userId}`, newData)
    console.log('data came back anddddd it is...', data)
    dispatch(addItemToCart(data))
  }
}

export const getItemsFromCart = user => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${user.id}`)
      dispatch(gotItemsFromCart(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const submitOrderThunk = (user, totalPrice) => {
  return async dispatch => {
    try {
      console.log(totalPrice, 'IS WHAT TOTAL PRICE IS')
      await axios.put(`/api/cart/${user.id}/order`, {totalPrice: totalPrice})
      const {data} = await axios.post(`/api/cart/${user.id}/order`)
      dispatch(gotItemsFromCart(data))
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
      if (item.quantity > 0) {
        const dataToSend = {
          quantity: (item.quantity -= 1),
          productId: item.productId,
          orderId: item.orderId
        }
        const {data} = await axios.put(`/api/cart/${user.id}`, dataToSend)
        dispatch(updateQuantity(data))
      } else {
        throw new Error('Cannot decrease quantity')
      }
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeItem = (user, item) => {
  return async dispatch => {
    try {
      const dataToDelete = {
        productId: item.productId,
        orderId: item.orderId
      }
      await axios.delete(`/api/cart/${user.id}`, {
        data: dataToDelete
      })
      dispatch(removeItemFromCart(dataToDelete))
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
    case REMOVE_ITEM: {
      const newCart = state.items[0].products.filter(
        item => item.id !== action.item.productId
      )
      let newOrder = [...state.items]
      newOrder[0].products = newCart
      return {...state, items: newOrder}
    }
    default:
      return state
  }
}
