import React, { Component, Fragment } from 'react'

import { getItems } from '../../api/allItems.js'
import { editCart } from '../../api/cartItems.js'

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

import './show.css'

class Show extends Component {
  constructor () {
    super()

    this.state = {
      itemsOnSale: []
    }
  }

  componentDidMount () {
    getItems(this.props.user)
      .then(res => {
        this.setState((prevState) => {
          return { itemsOnSale: [...prevState.itemsOnSale, ...res.data.itemsOnSale] }
        })
      })
      .catch(console.error)
  }

  addCart = e => {
    e.preventDefault()
    const idx = parseInt(e.target.getAttribute('data-key'))
    const cartCopy = [...this.props.cartItems]
    if (cartCopy.filter(item => item.itemId === this.state.itemsOnSale[idx]._id).length === 0) {
      cartCopy.push({
        itemId: this.state.itemsOnSale[idx]._id,
        itemName: this.state.itemsOnSale[idx].name,
        price: this.state.itemsOnSale[idx].price,
        qty: 1
      })
    } else {
      cartCopy.filter(item => item.itemId === this.state.itemsOnSale[idx]._id)[0].qty += 1
    }
    if (this.props.user) {
      console.log('user', this.props.user, cartCopy)
      const cart = {
        items: cartCopy,
        isDone: false
      }
      editCart(this.props.user, this.props.cartId, cart)
        .then((res) => console.log(''))
        .catch(console.error)
    }
    this.props.setCartItems(cartCopy)
    this.props.msgAlert({
      heading: 'Added to Cart',
      message: '',
      variant: 'success'
    })
  }

  render () {
    let jsx
    if (this.state.itemsOnSale.length !== 0) {
      jsx = (
        this.state.itemsOnSale.map((item, index) => {
          return (
            <Card key={index} className='card'>
              <Card.Img variant="top" src={item.itemImg} />
              <Card.Body>
                <Card.Title><div className='cardHead'><span>{item.name}</span><span>${item.price}</span></div></Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button type='submit' data-key={index} onClick={this.addCart}>Add to Cart</Button>
              </Card.Footer>
            </Card>
          )
        })
      )
    }
    return (
      <Fragment>
        <CardDeck className='deck'>
          {jsx}
        </CardDeck>
      </Fragment>
    )
  }
}

export default Show
