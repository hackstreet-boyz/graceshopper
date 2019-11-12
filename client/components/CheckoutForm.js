import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {toast} from 'react-toastify'
toast.configure()

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      complete: false,
      product: {
        name: 'Sriracha',
        price: 100
      }
    }
    this.submit = this.submit.bind(this)
  }

  async submit(event) {
    event.preventDefault()
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    console.log('token:', token)
    const product = this.state.product
    const response = await axios.post('/api/charge', {token, product})
    const {status} = response.data
    if (status === 'success') {
      this.setState({complete: true})
      toast('Purchase successful!', {type: 'success'})
    } else {
      toast('Something went wrong :(', {type: 'error'})
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>

    return (
      <div className="checkout">
        <CardElement />
        <button type="submit" onClick={this.submit}>
          Purchase
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
