import React from 'react'
import {connect} from 'react-redux'
import Table from 'react-bootstrap/Table'
import {getItemsFromCart, submitOrderThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    if (this.props.user) {
      this.props.getItemsFromCart(this.props.user)
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.submitOrder(this.props.user)
  }
  render() {
    console.log('this.props:', this.props)
    return this.props.cart && this.props.cart[0] ? (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {this.props.cart[0].products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.orderitems.quantity}</td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <button type="submit" onClick={this.handleSubmit}>
          Checkout
        </button>
      </div>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getItemsFromCart: user => dispatch(getItemsFromCart(user)),
    submitOrder: user => dispatch(submitOrderThunk(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
