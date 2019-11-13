import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import CheckoutForm from './CheckoutForm'

if (process.env.NODE_ENV !== 'production') require('../../secrets')

class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey={process.env.STRIPE_API_KEY}>
        <div className="example">
          <h1>Checkout</h1>
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default Checkout
