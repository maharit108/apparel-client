import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { addItems } from '../../api/allItems.js'

class Add extends Component {
  constructor () {
    super()

    this.state = {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      itemImg: '',
      tags: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onAdd = e => {
    const { user, msgAlert, history } = this.props
    const item = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      stock: this.state.stock,
      itemImg: this.state.itemImg,
      tags: this.state.tags
    }
    e.preventDefault()
    addItems(user, item)
      .then(() => msgAlert({
        heading: 'Item Added',
        message: 'Your Product has successfully been added',
        variant: 'success'
      }))
      .then(() => history.push('/admin'))
      .catch(error => {
        this.setState({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          itemImg: '',
          tags: ''
        })
        msgAlert({
          heading: 'Could not add Product at this time',
          message: error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { name, description, price, stock, itemImg, tags } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Add Item</h3>
          <Form onSubmit={this.onAdd}>
            <Form.Group controlId="name">
              <Form.Label>Name Of Product</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="Price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                required
                name="price"
                value={price}
                type="number"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="Stock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                required
                name="stock"
                value={stock}
                type="number"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="itemImg">
              <Form.Label>Item Images</Form.Label>
              <Form.Control
                required
                type="text"
                name="itemImg"
                value={itemImg}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="tags">
              <Form.Label>Add tags</Form.Label>
              <Form.Control
                as="select"
                name="tags"
                value={tags}
                onChange={this.handleChange}>
                <option>men</option>
                <option>women</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit"> Add </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(Add)
