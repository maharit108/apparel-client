import apiUrl from '../apiConfig'
import axios from 'axios'

export const getItems = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/items'
  })
}

export const getOneItem = (user, id) => {
  return axios({
    method: 'GET',
    url: apiUrl + `/items/${id}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const delItems = (user, itemId) => {
  return axios({
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    url: apiUrl + `/items/${itemId}`
  })
}

export const addItems = (user, item) => {
  return axios({
    url: apiUrl + '/items',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      item: {
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        itemImg: item.itemImg,
        tags: item.tags
      }
    }
  })
}

export const editItems = (user, item, id) => {
  console.log('editItem', item, user.token, id)
  return axios({
    url: apiUrl + `/items/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      item: {
        name: item.name,
        description: item.description,
        price: item.price,
        stock: item.stock,
        itemImg: item.itemImg,
        tags: item.tags
      }
    }
  })
}
