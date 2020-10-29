import { Component } from 'react'
// import { editCart } from '../../api/cartItems.js'

class AddtoCart extends Component {
  componentDidMount () {
    // editCart(this.props.user, this.props.cart)
    //   .then(res => {
    //     this.setState((prevState) => {
    //       return { items: [...prevState.items, ...res.data.itemsOnSale] }
    //     })
    //   })
    //   .catch(console.error)
    console.log('cart', this.props.cart, this.props.cart.items)
    // this.props.setCartItems({
    //   itemId: this.prop.id,
    //   itemName: this.prop.name,
    //   qty: this.prop.cart.
    // })
  }

  render () {
    return ('')
  }
}

export default AddtoCart
