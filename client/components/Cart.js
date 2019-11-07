import React from 'react'
import {connect} from 'react-redux'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {getItemsFromCart, submitOrderThunk} from '../store/cart'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    if (this.props.user) {
      this.props.getItemsFromCart(this.props.user)
    }
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
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
                <td>
                  <input
                    name="quantity"
                    type="text"
                    value={product.orderitems.quantity}
                    onChange={this.handleChange}
                  />
                </td>
                <td>{product.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Checkout
        </Button>
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
