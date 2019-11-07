import React from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk, gotOrderItemsThunk} from '../store/products'
import {addItemToCartThunk} from '../store/cart'
import axios from 'axios'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
    // this.props.gotOrderItems()
    // const {data} =axios.get('/api/cart/test')
    // console.log(data)
  }

  handleSubmit() {
    console.log(this.props.state)
    const putInCart = {
      orderId: this.props.singleproduct.orders[0].orderitems.orderId,
      productId: this.props.match.params.productId,
      quantity: 1
    }
    this.props.addItemToCart(this.props.userId, putInCart)
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
    } = this.props.singleproduct
    return (
      <div>
        <h1>{name}</h1>
        <img src={imageUrl} height="150" width="150" />
        <p>{price}</p>
        <p>{brand}</p>
        <p>{description}</p>
        <p>{category}</p>
        <button type="button" onClick={this.handleSubmit}>
          ADD ITEM
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userId: state.user.id,
    singleproduct: state.products.singleProduct,
    state: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProductThunk(id)),
    addItemToCart: (id, item) => dispatch(addItemToCartThunk(id, item))
    // gotOrderItems: () => dispatch(gotOrderItemsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
