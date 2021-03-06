import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import {toast} from 'react-toastify'
toast.configure()

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: 'Open Sans, sans-serif',
        letterSpacing: '0.025em',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#c23d4b'
      }
    }
  }
}

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
    const product = this.state.product
    const response = await axios.post('/api/charge', {token, product})
    const {status} = response.data
    if (status === 'success') {
      this.setState({complete: true})
      toast('🤙 Wow so easy!', {
        type: 'success',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    } else {
      toast('Something went wrong :(', {
        type: 'error',
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>

    return (
      <div className="checkout">
        <CardElement {...createOptions()} />
        <button type="submit" onClick={this.submit}>
          Purchase
        </button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
