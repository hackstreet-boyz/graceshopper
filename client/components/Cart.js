import React from 'react'
import {connect} from 'react-redux'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import {Redirect} from 'react-router-dom'
import {
  getItemsFromCart,
  submitOrderThunk,
  increaseQuantity,
  decreaseQuantity,
  removeItem
} from '../store/cart'
import CartTable from './CartTable'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.increase = this.increase.bind(this)
    this.decrease = this.decrease.bind(this)
    this.remove = this.remove.bind(this)
    this.redirectFunc = this.redirectFunc.bind(this)
  }

  redirectFunc() {
    console.log('working')
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/cart/confirmation" />
    }
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.getItemsFromCart(this.props.user)
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.submitOrder(this.props.user)
    this.redirectFunc()
  }

  increase(item) {
    this.props.increaseQuantity(this.props.user, item)
  }

  decrease(item) {
    this.props.decreaseQuantity(this.props.user, item)
  }

  remove(item) {
    this.props.removeItem(this.props.user, item)
  }

  render() {
    return this.props.cart && this.props.cart[0] ? (
      <div>
        {this.renderRedirect()}
        <CartTable
          cart={this.props.cart}
          item={this.props.item}
          increase={this.increase}
          decrease={this.decrease}
          remove={this.remove}
        />
        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Checkout
        </Button>
      </div>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart.items,
    item: state.cart.item,
    user: state.user,
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getItemsFromCart: user => dispatch(getItemsFromCart(user)),
    submitOrder: user => dispatch(submitOrderThunk(user)),
    increaseQuantity: (user, item) => dispatch(increaseQuantity(user, item)),
    decreaseQuantity: (user, item) => dispatch(decreaseQuantity(user, item)),
    removeItem: (user, item) => dispatch(removeItem(user, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
