import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/empty'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/switchMap'

(() => {
  const url = 'https://dev-rest-api.herokuapp.com/to-dos'
  var config = { method: 'GET', mode: 'cors', cache: 'default' };
  let foo = Observable.fromPromise(fetch(url, config))
    .switchMap(res => {
      return Observable.fromPromise(res.json())
    })
  foo.subscribe(
    json => {
      console.log(json)
    },
    error => {
      console.log(error)
    },
    () => {
      console.log('complete')
    }
  )
})()

