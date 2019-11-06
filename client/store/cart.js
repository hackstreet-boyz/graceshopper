import axios from 'axios'
import {combineReducers} from 'redux'

/*ACTION TYPES*/
const GOT_ITEMS_FROM_CART = 'GOT_ITEMS_FROM_CART'

/*INITIAL STATE*/
const initialState = []

/*ACTION CREATORS*/
const gotItemsFromCart = items => ({
  type: GOT_ITEMS_FROM_CART,
  items
})

/*THUNKS*/
export const getItemsFromCart = user => {
  return async dispatch => {
    try {
      console.log('Thunk is working...')
      const {data} = await axios.get(`/api/cart/${user.id}`)
      dispatch(gotItemsFromCart(data))
      console.log('Thunk is completed')
    } catch (error) {
      console.error(error)
    }
  }
}

export const submitOrderThunk = user => {
  return async dispatch => {
    try {
      console.log('Thunk is working...')
      await axios.put(`/api/cart/${user.id}/order`)
      const {data} = await axios.post(`/api/cart/${user.id}/order`)
      dispatch(gotItemsFromCart(data))
      console.log('Thunk is completed')
    } catch (error) {
      console.error(error)
    }
  }
}

/*REDUCERS*/
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ITEMS_FROM_CART:
      return action.items
    default:
      return state
  }
}
