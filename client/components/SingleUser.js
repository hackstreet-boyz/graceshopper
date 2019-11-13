import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Form, Col, Button} from 'react-bootstrap'

import {gotSingleUser} from '../store/user'

class SingleUser extends React.Component {
  constructor() {
    super()
    this.state = {
      form: false
    }
    this.changeForm = this.changeForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(event.target.firstName.value)
    const newInfo = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      address: event.target.address.value,
      phone: event.target.phone.value
    }
    console.log('THIS ARE OUR PROPS USERID', newInfo)
    this.props.gotSingleUser(newInfo, this.props.user.id)
  }

  changeForm() {
    this.setState({
      form: !this.state.form
    })
  }

  render() {
    const {
      id,
      address,
      creditcard,
      email,
      firstName,
      lastName,
      phone,
      photo
    } = this.props.user
    return (
      <div>
        {this.state.form ? (
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridfirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={firstName}
                  name="firstName"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridlastName">
                <Form.Label>lastName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={lastName}
                  name="lastName"
                />
              </Form.Group>
            </Form.Row>

            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder={email} name="email" />
            </Form.Group>

            <Form.Group controlId="formGridAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder={address} name="address" />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder={phone} name="phone" />
              </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        ) : (
          <div>
            <h1>Account</h1>
            <h2>
              {firstName} {lastName}
            </h2>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
            <p>Phone: {phone}</p>
            <p>
              <img src={photo} height="150" width="150" />
            </p>
          </div>
        )}
        <button onClick={this.changeForm}>Edit Info</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    gotSingleUser: (user, id) => dispatch(gotSingleUser(user, id))
  }
}

export default connect(mapStateToProps, mapDispatch)(SingleUser)
