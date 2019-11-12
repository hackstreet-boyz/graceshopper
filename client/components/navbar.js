import React from 'react'
import {Navbar as BootNav, Nav} from 'react-bootstrap'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>
      <Link to="/home">Hackstreet Market</Link>
    </h1>
    {isLoggedIn ? (
      <BootNav bg="primary" variant="dark">
        <BootNav.Brand href="/home">Home</BootNav.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
          <Nav.Link href="/login" onClick={handleClick}>
            Logout
          </Nav.Link>
        </Nav>
        {/* The navbar will show these links after you log in */}
        {/* <a href="#" onClick={handleClick}>
            Logout
          </a> */}
      </BootNav>
    ) : (
      <BootNav bg="primary" variant="dark">
        {/* The navbar will show these links before you log in */}
        <Nav className="mr-auto">
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Sign Up</Nav.Link>
          <Nav.Link href="/products">Products</Nav.Link>
          <Nav.Link href="/cart">Cart</Nav.Link>
        </Nav>
      </BootNav>
    )}
    <hr />
  </div>
)
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
