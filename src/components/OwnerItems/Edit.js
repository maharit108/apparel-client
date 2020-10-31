import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { editItems, getOneItem } from '../../api/allItems.js'

class EditItems extends Component {
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

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    getOneItem(user, match.params.id)
      .then((res) => {
        const { name, description, price, stock, itemImg, tags } = res.data.item
        this.setState({ name: name, description: description, price: price, stock: stock, itemImg: itemImg, tags: tags })
      })
      .catch(error => {
        msgAlert({
          heading: 'Could not get the Product at this time',
          message: error.message,
          variant: 'danger'
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onEdit = e => {
    const { user, msgAlert, history, match } = this.props
    const item = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      stock: this.state.stock,
      itemImg: this.state.itemImg,
      tags: this.state.tags
    }
    e.preventDefault()
    editItems(user, item, match.params.id)
      .then(() => msgAlert({
        heading: 'Changes Made',
        message: 'Your Product has successfully edited',
        variant: 'success'
      }))
      .then(() => history.push('/admin'))
      .catch(error => {
        msgAlert({
          heading: 'Could not make changes to Product at this time',
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
          <h3>Edit Item</h3>
          <Form onSubmit={this.onEdit}>
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
              <Form.Label>Item Images URL</Form.Label>
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

            <Button variant="primary" type="submit"> Make Changes </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(EditItems)
