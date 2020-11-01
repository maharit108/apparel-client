let apiUrl
const apiUrls = {
  production: 'https://git.heroku.com/whispering-hollows-83607.git',
  development: 'http://localhost:4741'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
