import axios from 'axios'

const GOT_ALL_ORDERS = 'GOT_ALL_ORDERS'

const gotAllOrders = orders => {
  return {
    type: GOT_ALL_ORDERS,
    orders
  }
}

export const getAllOrdersThunk = userId => {
  return async dispatch => {
    const {data} = axios.get(`/orders/${userId}`)
    dispatch(gotAllOrders(data))
  }
}

const orders = (state = [], action) => {
  switch (action.type) {
    case GOT_ALL_ORDERS:
      return action.orders
    default:
      return state
  }
}

export default orders
