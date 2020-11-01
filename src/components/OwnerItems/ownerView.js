import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getItems, delItems } from '../../api/allItems.js'

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import remove from './../../icons/remove.svg'
import edit from './../../icons/edit.svg'
import plus from './../../icons/plus.svg'

import '../Show/show.css'

class OwnerView extends Component {
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

  removeItem = e => {
    e.preventDefault()
    const { msgAlert, history } = this.props
    const idx = parseInt(e.target.getAttribute('data-key'))
    delItems(this.props.user, this.state.itemsOnSale[idx]._id)
      .then(() => msgAlert({
        heading: 'Item Deleted',
        message: 'Your Product has successfully removed',
        variant: 'success'
      }))
      .catch(() => msgAlert({
        heading: 'Item Could not Deleted',
        message: '',
        variant: 'danger'
      }))
      .finally(() => history.push('/'))
  }

  render () {
    let jsx = (<h1>Loading ..... </h1>)
    if (this.state.itemsOnSale.length !== 0) {
      jsx = (
        this.state.itemsOnSale.map((item, index) => {
          return (
            <Card key={index} id='card'>
              <Card.Img variant="top" src={item.itemImg} />
              <Card.Body>
                <Card.Title>{<div className='cardHead'><span>{item.name}</span><span>${item.price}</span></div>}</Card.Title>
                <Card.Text>
                  {item.description}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <span><img data-key={index} onClick={this.removeItem} className='icons del' src={remove} alt='Delete Item' /></span>
                <Link to={`/editItems/${item._id}`}><img className='icons edit' src={edit} alt='Edit Item' /></Link>
              </Card.Footer>
            </Card>
          )
        })
      )
    }
    return (
      <Fragment>
        <div className='storeAdd'>
          <span>ADD ITEMS</span><Link to={'/addItems'}><img className='icons plus' src={plus} alt='Add Item' /></Link>
        </div>
        <CardDeck className='deck'>
          {jsx}
        </CardDeck>
      </Fragment>
    )
  }
}

export default withRouter(OwnerView)
