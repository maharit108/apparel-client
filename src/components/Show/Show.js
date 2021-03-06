import React, { Component, Fragment } from 'react'

import { getItems } from '../../api/allItems.js'
import { editCart } from '../../api/cartItems.js'

import CircularProgress from '@material-ui/core/CircularProgress'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
// import Button from 'react-bootstrap/Button'
import add from './../../icons/addCart.svg'

import './show.css'

class Show extends Component {
  constructor () {
    super()

    this.state = {
      itemsOnSale: [],
      isLoaded: false
    }
  }

  componentDidMount () {
    getItems(this.props.user)
      .then(res => {
        this.setState((prevState) => {
          return { itemsOnSale: [...prevState.itemsOnSale, ...res.data.itemsOnSale] }
        })
      })
      .then(() => {
        this.setState({ isLoaded: true })
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
            <Card key={index} id='card' >
              <Card.Img variant="top" src={item.itemImg} />
              <Card.Body>
                <Card.Title><div className='cardHead'><span>{item.name}</span><span>${item.price}</span></div></Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <span><img data-key={index} onClick={this.addCart} className='icons add' src={add} alt='Add items to Cart' /></span>
              </Card.Footer>
            </Card>
          )
        })
      )
    }
    return (
      this.state.isLoaded ? (
        <Fragment>
          <CardDeck className='deck'>
            {jsx}
          </CardDeck>
        </Fragment>) : (
        <div className='cart__loading'>
          <CircularProgress size='5rem' thickness={2} />
        </div>)
    )
  }
}

export default Show
