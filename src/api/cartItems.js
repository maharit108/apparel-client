import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllCarts = (user) => {
  return axios({
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/carts'
  })
}

export const getRecentCart = (user) => {
  return axios({
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/my-cart'
  })
}

export const addCart = (user, items, isDone) => {
  return axios({
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/my-cart',
    data: {
      bag: {
        cartItems: items,
        isCompleted: isDone
      }
    }
  })
}

export const editCart = (user, cartId, cart) => {
  return axios({
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + `/my-cart/${cartId}`,
    data: {
      bag: {
        cartItems: cart.items,
        isCompleted: cart.isDone
      }
    }
  })
}

export const delThisCart = (user, cartId) => {
  return axios({
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + `/my-cart/${cartId}`
  })
}
