const constants = {
  ENV: 'LOCAL',
  APP: {
    REST_BASE_URL: this.ENV === 'LOCAL' ? 'http://localhost:3000' : 'https://dev-rest-api.herokuapp.com'
  }
}
