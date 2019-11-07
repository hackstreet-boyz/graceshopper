import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }

  render() {
    this.props.allProducts
      ? console.log('THIS IS PROPS', this.props)
      : console.log('nope')

    return this.props.allProducts && this.props.allProducts[0] ? (
      <div>
        <h1>HELLO FRIENDS</h1>
        {this.props.allProducts.map(product => (
          <div>
            <ul>
              <li key={product.id}>
                {product.name}
                <img src={product.imageUrl} height="140" width="100" />
              </li>
            </ul>
          </div>
        ))}
      </div>
    ) : null
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
