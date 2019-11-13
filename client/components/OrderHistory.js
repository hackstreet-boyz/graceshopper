import React from 'react'
import {getAllOrdersThunk} from '../store/orders'
import {connect} from 'react-redux'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.getAllOrders(this.props.userId)
  }
  render() {
    console.log(this.props.orders)
    return this.props.orders && this.props.orders[0] ? (
      this.props.orders.map(order => {
        let date = new Date(order.updatedAt)
        // date = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`

        Date.parse()
        return (
          <div>
            <h4> {`${date}`}</h4>
            <table className="table table-striped" key={order.id}>
              <thead>
                <tr>
                  <td>Product</td>
                  <td>Price</td>
                  <td>Quantity</td>
                </tr>
              </thead>
              <tbody>
                {order.products[0] && order.products[0].orderitems ? (
                  order.products.map(product => {
                    return (
                      <tr key={product.key}>
                        <td>{product.name}</td>
                        <td>
                          ${(product.orderitems.historicPrice / 100).toFixed(2)}
                        </td>
                        <td>{product.orderitems.quantity}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>No past order history. Saucify your life today!</tr>
                )}
              </tbody>
            </table>
            <h6> Total Price: ${(order.totalPrice / 100).toFixed(2)}</h6>
            <br />
            <br />
          </div>
        )
      })
    ) : (
      <div> No orders to show</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
