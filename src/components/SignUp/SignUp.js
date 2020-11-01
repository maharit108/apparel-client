import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import { getRecentCart, addCart } from '../../api/cartItems.js'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      user: {}
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => {
        setUser(res.data.user)
        this.setState({ user: res.data.user })
      })
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => {
        getRecentCart(this.state.user)
          .then(res => {
            if (res.data.recentCart.length !== 0) {
              let cartCopy = []
              if (this.props.cartItems.length !== 0) {
                const propCartCopy = [...this.props.cartItems]
                const resCartCopy = [...res.data.recentCart[0].cartItems]

                propCartCopy.forEach((item, idx) => {
                  resCartCopy.forEach((cal, index) => {
                    if (item.itemId === cal.itemId) {
                      cal.qty += item.qty
                      propCartCopy.splice(idx, 1)
                    }
                  })
                })

                cartCopy = [...propCartCopy, ...resCartCopy]
              } else {
                cartCopy = [...res.data.recentCart[0].cartItems]
              }

              this.props.setCartId(res.data.recentCart[0]._id)
              this.props.setCartItems(cartCopy)
            } else {
              addCart(this.state.user, [], false)
                .then((res) => {
                  console.log(res, 'post coz no cart')
                  this.props.setCartId(res.data.bag._id)
                  this.props.setCartItems([...this.props.cartItems])
                })
            }
          })
      })
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Sign Up</h3>
          <Form onSubmit={this.onSignUp}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={email}
                placeholder="Enter email"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                required
                name="passwordConfirmation"
                value={passwordConfirmation}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
