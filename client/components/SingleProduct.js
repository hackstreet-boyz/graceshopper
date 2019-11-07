import React from 'react'
import {connect} from 'react-redux'
import {getSingleProductThunk} from '../store/products'
import {addItemToCartThunk} from '../store/cart'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getSingleProduct(this.props.match.params.productId)
  }

  handleSubmit() {
    console.log(this.props.singleproduct)
    console.log(this.props.userId)
    console.log(this.props.state)
    this.props.addItemToCart(this.props.userId, this.props.singleproduct)
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
        <button type="button" onClick={this.handleSubmit} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
