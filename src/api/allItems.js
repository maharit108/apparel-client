import apiUrl from '../apiConfig'
import axios from 'axios'

export const getItems = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/items'
  })
}
