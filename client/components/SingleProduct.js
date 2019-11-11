import React from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/products'
import {addItemToCartThunk, cartIdThunk} from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.guestCartAdd = this.guestCartAdd.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
    this.props.getCartId(this.props.userId)
  }

  handleSubmit() {
    const putInCart = {
      orderId: this.props.cartId[this.props.cartId.length - 1].id,
      productId: this.props.match.params.productId,
      quantity: 1
    }
    this.props.addItemToCart(this.props.userId, putInCart)
  }

  guestCartAdd() {
    const guestCart = 'guestCart'
    let currentGuestCart = JSON.parse(window.localStorage.getItem(guestCart))
    if (currentGuestCart && currentGuestCart[this.props.singleProduct.id]) {
      currentGuestCart[
        this.props.singleProduct.id
      ].orderitems.quantity = ++currentGuestCart[this.props.singleProduct.id]
        .orderitems.quantity
      window.localStorage.setItem(guestCart, JSON.stringify(currentGuestCart))
    } else if (currentGuestCart) {
      currentGuestCart[this.props.singleProduct.id] = this.props.singleProduct
      currentGuestCart[this.props.singleProduct.id].orderitems = {quantity: 1}
      window.localStorage.setItem(guestCart, JSON.stringify(currentGuestCart))
    } else {
      const initalCart = {
        [this.props.singleProduct.id]: this.props.singleProduct
      }
      initalCart[this.props.singleProduct.id].orderitems = {quantity: 1}
      window.localStorage.setItem(guestCart, JSON.stringify(initalCart))
    }
    console.log(JSON.parse(window.localStorage.guestCart))
  }

  render() {
    const {
      name,
      id,
      price,
      brand,
      imageUrl,
      description,
      category,
      stock
    } = this.props.singleProduct

    return this.props.singleProduct ? (
      <div>
        <h1>{name}</h1>
        <img src={imageUrl} height="150" width="150" />
        <p>{price}</p>
        <p>{brand}</p>
        <p>{description}</p>
        <p>{category}</p>
        <button
          type="button"
          onClick={
            this.props.isLoggedIn ? this.handleSubmit : this.guestCartAdd
          }
        >
          ADD ITEM
        </button>
      </div>
    ) : null
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    singleProduct: state.products.singleProduct,
    cartId: state.cart.cartId,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProductThunk(id)),
    addItemToCart: (id, item) => dispatch(addItemToCartThunk(id, item)),
    getCartId: id => dispatch(cartIdThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
