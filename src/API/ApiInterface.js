import config from '../config'

export default class ApiInterface  {
    
  constructor( options ) {
    // import api configuration.
    this.API_BASE = config.API_BASE
    this.API_TOKEN = config.API_TOKEN
    
    // bind options to interface and then deconstruct them.
    this.options = options
    const { method = 'GET', endpoint = 'note', resourceId = false, body = false } = this.options
    
    // start building up the request endpoint.
    this.requestEndpoint = `${this.API_BASE}/${endpoint}`

    // by default, all requests are for all resources at a given colleciton point, but you can identify a single one.
    if ( resourceId ) {
      this.requestEndpoint += `/${resourceId}`
    }
    
    // start building up the request.
    this.request = {
      method,
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.API_TOKEN}`
      }
    }
      
    // not all requests need a body. 
    if ( body ) {
      this.request.body = JSON.stringify( body )
    }
  }
  
  goFetch () {
    return fetch( this.requestEndpoint, this.request )
      .then( response => {
        // throw an error when the response is bad
        if ( !response.ok ) {
          return response
            .json()
            .then( error => {
              throw error
            })
        }
        return response.json()
      })
      .then( resolvedResponse => {
        return resolvedResponse
      })
  }
}
