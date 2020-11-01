import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { editCart, addCart } from '../../api/cartItems.js'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form, { Col } from 'react-bootstrap/Form'

import plus from './../../icons/plus.svg'
import remove from './../../icons/remove.svg'

import './cart.css'

class Cart extends Component {
  constructor () {
    super()

    this.state = {
      itemsInCart: [],
      cartNo: '',
      firstName: '',
      lastName: '',
      date: '',
      cvv: '',
      address: '',
      contactInfo: ''
    }
  }

  componentDidMount () {
    this.setState((prevState) => {
      return { itemsInCart: [...prevState.itemsInCart, ...this.props.cartItems] }
    })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onPay = e => {
    e.preventDefault()
    const cart = {
      items: this.state.itemsInCart,
      isDone: true
    }
    const { user, cartId, msgAlert, history } = this.props

    editCart(user, cartId, cart)
      .then((res) => {
        msgAlert({
          heading: 'Your Order has been placed ',
          message: '',
          variant: 'success'
        })
      })
      .then(() => {
        this.setState({
          itemsInCart: [],
          cartNo: '',
          firstName: '',
          lastName: '',
          date: '',
          cvv: '',
          address: '',
          contactInfo: ''
        })
      })
      .then(() => {
        addCart(this.props.user, [], false)
          .then((res) => {
            this.props.setCartId(res.data.bag._id)
            this.props.clearCartItems()
          })
          .catch((error) => {
            msgAlert({
              heading: 'Could not place order at this time ',
              message: error.message,
              variant: 'danger'
            })
          })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Could not place order at this time ',
          message: error.message,
          variant: 'danger'
        })
      })
      .finally(() => history.push('/'))
  }

  delFromCart = e => {
    e.preventDefault()
    const idx = parseInt(e.target.getAttribute('data-key'))
    const cartCopy = [...this.state.itemsInCart]
    if (cartCopy[idx].qty <= 1) {
      cartCopy.splice(idx, 1)
    } else {
      cartCopy[idx].qty -= 1
    }
    if (this.props.user) {
      const cart = {
        items: cartCopy,
        isDone: false
      }
      editCart(this.props.user, this.props.cartId, cart)
        .then((res) => console.log(''))
        .catch(console.error)
    }
    this.props.setCartItems(cartCopy)
    this.setState({ itemsInCart: cartCopy })
  }

  addOneCart = e => {
    e.preventDefault()
    const idx = parseInt(e.target.getAttribute('data-key'))
    const cartCopy = [...this.state.itemsInCart]
    cartCopy[idx].qty += 1
    if (this.props.user) {
      const cart = {
        items: cartCopy,
        isDone: false
      }
      editCart(this.props.user, this.props.cartId, cart)
        .then((res) => console.log(''))
        .catch(console.error)
    }
    this.props.setCartItems(cartCopy)
    this.setState({ itemsInCart: cartCopy })
  }

  render () {
    const { cartNo, firstName, lastName, date, cvv, address, contactInfo } = this.state
    let jsx = (<h3 className='emptyCart'>Cart is Empty</h3>)
    let total = 0
    if (this.state.itemsInCart.length !== 0) {
      jsx = (
        <Fragment>
          <div className='orderCart'>
            <h3 className='order'>Order:</h3>
            <Table>
              <thead>
                <tr key='head'>
                  <th>#</th>
                  <th>{'Product'}</th>
                  <th>{'Quantity'}</th>
                  <th>{'Unit'}</th>
                  <th>{'Price'}</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.itemsInCart.map((item, index) => {
                    total += (item.price * item.qty)
                    return (
                      <tr key={index}>
                        <th className='cart'>{index + 1}</th>
                        <th className='cart'>{item.itemName}</th>
                        <th className='cart'>{item.qty}</th>
                        <th className='cart'>${item.price}</th>
                        <th className='cart'>${(Math.round(item.price * item.qty * 100) / 100).toFixed(2)}</th>
                        <th className='cart'>
                          <span><img data-key={index} onClick={this.addOneCart} className='icons plus' src={plus} alt='Increase item by 1' /></span>
                        </th>
                        <th className='cart'>
                          <span><img data-key={index} onClick={this.delFromCart} className='icons del' src={remove} alt='Decrease item by 1' /></span>
                        </th>
                      </tr>
                    )
                  })
                }
                <tr>
                  <th colSpan="4" className='total'>{'Total'}</th>
                  <th >${(Math.round(total * 100) / 100).toFixed(2)}</th>
                </tr>
              </tbody>
            </Table>
          </div>
        </Fragment>
      )
    }

    let form = (
      <div className="row pay">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Form onSubmit={this.onPay}>
            <Form.Row>
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control name='firstName' value={firstName} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control name='lastName' value={lastName} onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="cartNo">
              <Form.Label>Card Number</Form.Label>
              <Form.Control placeholder="1111 2222 3333 4444" name='cartNo' value={cartNo} onChange={this.handleChange} />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} controlId="date">
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control name='date' value={date} onChange={this.handleChange} placeholder="02/22" />
              </Form.Group>

              <Form.Group as={Col} controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control name='cvv' value={cvv} onChange={this.handleChange} placeholder="123" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St, Chicago, IL-60626" name='address' value={address} onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="contactInfo">
              <Form.Label>Contact Info</Form.Label>
              <Form.Control placeholder="111-2223456" name='contactInfo' value={contactInfo} onChange={this.handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
    if (!this.props.user) {
      form = (
        <h3 className='formtxt'>Please Sign In to Complete order</h3>
      )
    }
    return (
      <Fragment>
        <div className="cartBox">
          <div className="cartShow">
            <div className="col-sm-10 col-md-8 mx-auto mt-5">
              {jsx}
            </div>
          </div>
          {form}
        </div>
      </Fragment>
    )
  }
}

export default withRouter(Cart)
