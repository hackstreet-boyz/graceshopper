import React from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk} from './store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getAllProducts()
  }
  render() {
    console.log('the Props are >>>>>', this.props)
    return <div />
  }
}

const mapStateToProps = state => {
  return {
    AllProducts: state.AllProducts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllProducts: () => dispatch(getAllProductsThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
