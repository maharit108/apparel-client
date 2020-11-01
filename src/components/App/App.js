import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Show from '../Show/Show.js'
import Cart from '../Cart/Cart.js'
import PastCarts from '../Cart/PastCarts.js'
import AddItems from '../OwnerItems/Add.js'
import EditItems from '../OwnerItems/Edit.js'
import OwnerView from '../OwnerItems/ownerView.js'

import Footer from '../Footer/footer.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],

      cartId: null,
      cartItems: []
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })
  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  setCartId = cartId => this.setState({ cartId })
  clearCartId = () => this.setState({ cartId: null })
  clearCartItems = () => this.setState({ cartItems: [] })
  setCartItems = (cartItems) => this.setState({ cartItems })

  render () {
    const { msgAlerts, user, cartItems, cartId } = this.state
    console.log('app', this.state)
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Show user={user} cartItems={cartItems} setCartItems={this.setCartItems} msgAlert={this.msgAlert} cartId={cartId}/>
          )} />
          <Route exact path='/my-cart' render={() => (
            <Cart user={user} cartItems={cartItems} setCartItems={this.setCartItems} clearCartItems={this.clearCartItems} msgAlert={this.msgAlert} cartId={cartId} setCartId={this.setCartId} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} setCartId={this.setCartId} setCartItems={this.setCartItems} cartItems={cartItems} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} setCartId={this.setCartId} setCartItems={this.setCartItems} cartItems={cartItems} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} clearCartId={this.clearCartId} clearCartItems={this.clearCartItems} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <Route exact path='/admin' render={() => (
            <OwnerView user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/addItems' render={() => (
            <AddItems msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/editItems/:id' render={({ match }) => (
            <EditItems msgAlert={this.msgAlert} user={user} match={match}/>
          )} />
          <AuthenticatedRoute user={user} path='/history' render={() => (
            <PastCarts msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
        <Footer user={this.props.user}/>
      </Fragment>
    )
  }
}

export default App
