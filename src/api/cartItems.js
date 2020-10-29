import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllCarts = (user) => {
  return axios({
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/history'
  })
}

export const getRecentCart = (user, id) => {
  return axios({
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + `/my-cart/${id}`
  })
}

export const addCart = (user, cart) => {
  return axios({
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + '/my-cart',
    data: {
      bag: {
        cartItems: cart.items,
        isCompleted: cart.isDone
      }
    }
  })
}

export const editCart = (user, id, cart) => {
  return axios({
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + `/my-cart/${id}`,
    data: {
      bag: {
        cartItems: cart.items,
        isCompleted: cart.isDone
      }
    }
  })
}
