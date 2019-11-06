import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    console.log('HELLLOOO', this.props)
    return (
      <div>
        {this.props.allProducts.lenght > 0 && (
          <h2>You have {this.props.AllProducts.name} unread messages.</h2>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.AllProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
