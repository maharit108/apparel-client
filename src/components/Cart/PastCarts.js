
import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
// import { getItems } from '../../api/allItems.js'
import { getAllCarts, delThisCart } from '../../api/cartItems.js'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Footer from '../Footer/footer.js'

import './pastcarts.css'

class PastCarts extends Component {
  constructor () {
    super()

    this.state = {
      pastCarts: []
    }
  }

  componentDidMount () {
    getAllCarts(this.props.user)
      .then(res => {
        const oldCarts = []
        oldCarts.push(res.data.carts.filter(cart => cart.isCompleted === true))
        this.setState({ pastCarts: oldCarts[0] })
        console.log('old', this.state.pastCarts, oldCarts)
      })
      .catch((error) => {
        this.props.msgAlert({
          heading: 'Could not process at this time ',
          message: error.message,
          variant: 'danger'
        })
      })
  }

delCart = e => {
  e.preventDefault()
  const idx = parseInt(e.target.getAttribute('data-key'))
  const toDelCart = this.state.pastCarts[idx]
  delThisCart(this.props.user, toDelCart._id)
    .then((res) => {
      this.props.msgAlert({
        heading: 'Deleted ',
        message: '',
        variant: 'success'
      })
    })
    .catch((error) => {
      this.props.msgAlert({
        heading: 'Could not Delete ',
        message: error.message,
        variant: 'danger'
      })
    })
    .finally(() => this.props.history.push('/'))
}

render () {
  let jsx = (<h3 className='empty'>No Previous Transactions</h3>)
  if (this.state.pastCarts.length !== 0) {
    jsx = (
      <Fragment>
        <h3 className='order'>Transaction History:</h3>
        <Table>
          <thead>
            <tr key='head'>
              <th>#</th>
              <th>{'Transaction'}</th>
              <th>{'Price'}</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.pastCarts.map((cart, index) => {
                let total = 0
                return (
                  <tr key={index}>
                    <th className='cart'>{index + 1}</th>
                    <th className='cart'>{cart.cartItems.map((item, idx) => {
                      total += (item.price * item.qty)
                      return (
                        <div key={idx}>
                          {item.itemName} - {item.qty}
                        </div>
                      )
                    })}</th>
                    <th className='cart'>{(Math.round(total * 100) / 100).toFixed(2)}</th>
                    <th className='cart'>
                      <Button data-key={index} onClick={this.delCart}>X</Button>
                    </th>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <div className="cartShow">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          {jsx}
        </div>
      </div>
      <Footer user={this.props.user}/>
    </Fragment>
  )
}
}

export default withRouter(PastCarts)
