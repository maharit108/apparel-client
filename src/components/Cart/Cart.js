import React, { Component, Fragment } from 'react'
// import { Link } from 'react-router-dom'
// import { getItems } from '../../api/allItems.js'
// import { editCart } from '../../api/cartItems.js'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form, { Col } from 'react-bootstrap/Form'
import Footer from '../Footer/footer.js'

import './cart.css'

class Cart extends Component {
  constructor () {
    super()

    this.state = {
      itemsInCart: [],
      cardNo: '',
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
    this.props.msgAlert({
      heading: 'Your Order has been placed ',
      message: '',
      variant: 'success'
    })
    this.setState({
      itemsInCart: [],
      cardNo: '',
      firstName: '',
      lastName: '',
      date: '',
      cvv: '',
      address: '',
      contactInfo: ''
    })
  }

  render () {
    let jsx = (<h3 className='empty'>Cart is Empty</h3>)
    let total = 0
    if (this.state.itemsInCart.length !== 0) {
      jsx = (
        <Fragment>
          <h3 className='order'>Order:</h3>
          <Table>
            <thead>
              <tr key='head'>
                <th>#</th>
                <th>{'Product'}</th>
                <th>{'Quantity'}</th>
                <th>{'Price'}</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.itemsInCart.map((item, index) => {
                  total += item.price
                  return (
                    <tr key={index}>
                      <th className='cart'>{index + 1}</th>
                      <th className='cart'>{item.itemName}</th>
                      <th className='cart'>{item.qty}</th>
                      <th className='cart'>{item.price}</th>
                    </tr>
                  )
                })
              }
              <tr>
                <th colSpan="3" className='total'>{'Total'}</th>
                <th >{total}</th>
              </tr>
            </tbody>
          </Table>
        </Fragment>
      )
    }
    console.log('cart', this.state.itemsInCart)
    const { cardNo, firstName, lastName, date, cvv, address, contactInfo } = this.state
    return (
      <Fragment>
        <div className="cartBox">
          <div className="cartShow">
            <div className="col-sm-10 col-md-8 mx-auto mt-5">
              {jsx}
            </div>
          </div>
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

                <Form.Group controlId="cardNo">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control placeholder="1111 2222 3333 4444" name='cardNo' value={cardNo} onChange={this.handleChange} />
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
        </div>
        <Footer user={this.props.user}/>
      </Fragment>
    )
  }
}

export default Cart
