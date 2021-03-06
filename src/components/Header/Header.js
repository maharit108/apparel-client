import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import favicon from './../../icons/favicon.png'
import cart from './../../icons/cart.svg'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#history">Past Transactions</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#my-cart"><img className='headicon' src={cart} alt='Cart' /></Nav.Link>
  </Fragment>
)

const ownerOption = (
  <Fragment>
    <Nav.Link href="#admin">Owner View</Nav.Link>
  </Fragment>
)

const Header = ({ user, cartItems }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href='#'>
      <img className='favicon' src={favicon} alt='Favicon' />  Apparels
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { user ? (user.owner ? ownerOption : '') : ''}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
