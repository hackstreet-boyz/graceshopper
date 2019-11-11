import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(event) {
    event.preventDefault()
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    console.log('token', token)
    let response = await axios.post('/api/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) this.setState({complete: true})
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
