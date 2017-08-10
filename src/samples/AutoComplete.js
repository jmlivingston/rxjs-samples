import React, { Component } from 'react'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/empty'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/switchMap'

class AutoComplete extends Component {
  state = { items: [] }
  componentDidMount () {
    const url = 'https://dev-rest-api.herokuapp.com/to-dos'
    var config = { method: 'GET', mode: 'cors', cache: 'default' };
    let foo = Observable.fromPromise(fetch(url, config))
      .switchMap(res => {
        return Observable.fromPromise(res.json())
      })
    foo.subscribe(
      json => {
        console.log(json)
        this.setState({ items: json })
      },
      error => {
        console.log(error)
      },
      () => {
        console.log('complete')
      }
    )
  }
  render () {
    return <div>
      {
        this.state.items && this.state.items.map(item => {
          return <div key={item.id}>{item.name}</div>
        })
      }
    </div>
  }
}

export default AutoComplete