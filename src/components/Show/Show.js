import React, { Component, Fragment } from 'react'

import { getItems } from '../../api/allItems.js'
// import Card from 'react-bootstrap/Card'

class Show extends Component {
  constructor () {
    super()

    this.state = {
      items: [],
      cart: []
    }
  }

  componentDidMount () {
    getItems(this.props.user)
      .then(res => {
        console.log(res.data.itemsOnSale)
        if (res.data.length > 0) {
          this.setState((prevState) => {
            return { items: [...prevState.items, ...res.data.itemsOnSale] }
          })
        }
      })
  }

  render () {
    // let jsx
    // if (this.state.items.length !== 0) {
    //   jsx = (
    //     <CardDeck>
    //       <Card>
    //         <Card.Img variant="top" src="holder.js/100px160" />
    //         <Card.Body>
    //           <Card.Title>Card title</Card.Title>
    //           <Card.Text>
    //             This is a wider card with supporting text below as a natural lead-in to
    //             additional content. This content is a little bit longer.
    //           </Card.Text>
    //         </Card.Body>
    //         <Card.Footer>
    //           <small className="text-muted">Last updated 3 mins ago</small>
    //         </Card.Footer>
    //       </Card>
    //   )
    // }
    return (
      <Fragment>
      </Fragment>
    )
  }
}

export default Show
