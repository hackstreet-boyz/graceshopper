import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    return (
      <div>
        {this.props.allProducts.length > 0
          ? // this.props.allProducts.products.allProducts[0].name
            this.props.allProducts.map(product => (
              <div key={product.id}>
                <ul>
                  <li>
                    {product.name}
                    <a>
                      <img src={product.imageUrl} height="140" width="100" />
                    </a>
                  </li>
                </ul>
              </div>
            ))
          : null}
      </div>
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
