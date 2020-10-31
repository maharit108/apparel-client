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
import AddItems from '../OwnerItems/Add.js'
import OwnerView from '../OwnerItems/ownerView.js'
import OwnerSignIn from '../OwnerItems/OwnerSignIn.js'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],

      cartId: null,
      isCartDone: false,
      cartItems: []
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })
  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  setDone = user => this.setState({ isDone: true })
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
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} setCartId={this.setCartId}/>
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
          <Route path='/admin-sign-in' render={() => (
            <OwnerSignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/admin' render={() => (
            <OwnerView user={user} msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/addItems' render={() => (
            <AddItems msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
