import React from 'react'
import {connect} from 'react-redux'

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
        <h1>Account</h1>
        <h2>
          {firstName} {lastName}
        </h2>
        <p>{email}</p>
        <p>{address}</p>
        <p>{phone}</p>
        <p>{creditcard}</p>
        <p>
          <img src={photo} height="150" width="150" />
        </p>
        {this.state.form ? (
          <form onSubmit={this.handleSubmit}>
            <label>
              First Name:<input
                type="text"
                defaultValue={firstName}
                name="firstName"
              />
            </label>
            <label>
              Last Name:<input
                type="text"
                defaultValue={lastName}
                name="lastName"
              />
            </label>
            <label>
              email:<input type="text" defaultValue={email} name="email" />
            </label>
            <label>
              address:<input
                type="text"
                defaultValue={address}
                name="address"
              />
            </label>
            <label>
              phone:<input type="text" defaultValue={phone} name="phone" />
            </label>
            <input type="submit" />
          </form>
        ) : null}
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
