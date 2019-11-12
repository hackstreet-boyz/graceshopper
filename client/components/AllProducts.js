import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'
import {addItemToCartThunk} from '../store/cart'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.guestCartAdd = this.guestCartAdd.bind(this)
  }

  componentDidMount() {
    this.props.getAllProducts()
  }

  handleSubmit(event, product) {
    // console.log('props', this.props)
    event.preventDefault()
    const putInCart = {
      // orderId: this.props.singleProduct.orders[0].id,
      productId: product.id,
      quantity: 1
    }
    this.props.addItemToCart(this.props.userId.id, putInCart)
  }

  guestCartAdd(e, product) {
    e.preventDefault()
    console.log('THIS IS OUR EVENT', currentGuestCart)
    const guestCart = 'guestCart'
    let currentGuestCart = JSON.parse(window.localStorage.getItem(guestCart))
    console.log('OUR CARTs', currentGuestCart)
    if (currentGuestCart && currentGuestCart[product.id]) {
      currentGuestCart[product.id].orderitems.quantity = ++currentGuestCart[
        product.id
      ].orderitems.quantity
      window.localStorage.setItem(guestCart, JSON.stringify(currentGuestCart))
    } else if (currentGuestCart) {
      currentGuestCart[product.id] = product
      currentGuestCart[product.id].orderitems = {quantity: 1}
      window.localStorage.setItem(guestCart, JSON.stringify(currentGuestCart))
    } else {
      const initalCart = {
        [product.id]: product
      }
      initalCart[product.id].orderitems = {quantity: 1}
      window.localStorage.setItem(guestCart, JSON.stringify(initalCart))
    }
    console.log(JSON.parse(window.localStorage.guestCart))
  }

  render() {
    console.log('props', this.props)
    return (
      <ul className="list-group">
        {this.props.allProducts.length > 0
          ? // this.props.allProducts.products.allProducts[0].name
            this.props.allProducts.map(product => (
              <li className="list-group-item d-flex flex-row" key={product.id}>
                <div className="p-3 w-25">
                  {' '}
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} height="180" width="160" />
                  </Link>
                </div>
                <div className="p-3 w-25 card border-0">
                  <div className="card-body">
                    <h4 className="card-title">
                      <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </h4>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {product.brand}
                    </h6>
                    <p className="card-text">{product.description}</p>
                  </div>
                </div>
                <div className="p-5 w-25 h-100">
                  <h5 className="text-center align-middle">
                    ${(product.price / 100).toFixed(2)}
                  </h5>
                </div>
                <div className="w-25 d-flex flex-column justify-content-center">
                  <button
                    id={product.id}
                    className="flex-item w-40"
                    onClick={
                      this.props.isLoggedIn
                        ? e => this.handleSubmit(e, product)
                        : e => this.guestCartAdd(e, product)
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            ))
          : null}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts,
    userId: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk()),
    addItemToCart: (id, item) => dispatch(addItemToCartThunk(id, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
