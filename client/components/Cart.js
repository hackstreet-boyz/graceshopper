import React, {useState} from 'react'
import {connect} from 'react-redux'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {
  getItemsFromCart,
  submitOrderThunk,
  increaseQuantity
} from '../store/cart'
import CartTable from './CartTable'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.increase = this.increase.bind(this)
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

  increase(item) {
    this.props.increaseQuantity(this.props.user, item)
  }

  decreaseQuantity() {}

  render() {
    console.log('this.props:', this.props)
    return this.props.cart && this.props.cart[0] ? (
      <div>
        <CartTable cart={this.props.cart} increase={this.increase} />
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
    submitOrder: user => dispatch(submitOrderThunk(user)),
    increaseQuantity: (user, item) => dispatch(increaseQuantity(user, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
