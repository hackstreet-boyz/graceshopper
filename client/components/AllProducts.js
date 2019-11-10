import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return (
      <ul className="list-group">
        {this.props.allProducts.length > 0
          ? // this.props.allProducts.products.allProducts[0].name
            this.props.allProducts.map(product => (
              <li className="list-group-item d-flex flex-row" key={product.id}>
                <div className="p-3 w-25">
                  {' '}
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} height="160" width="160" />
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
                  <button className="flex-item w-40">
                    add to cart (this is a placeholder for now)
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
    allProducts: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
