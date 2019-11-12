import React from 'react'
import {getAllOrdersThunk} from '../store/orders'

export default class OrderHistory extends React.Component {
  componentDidMount() {
    getAllOrders(this.props.userId)
  }
  render() {
    return (
      <ul>
        {this.props.orders.map(order => {
          let date = new Date(order.date)
          return (
            <li>
              <h4> Order date: {date}</h4>
            </li>
          )
        })}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllOrders: id => dispatch(getAllOrdersThunk(id))
  }
}
