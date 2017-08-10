import 'rxjs/add/observable/fromPromise'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/switchMap'
import { Observable } from 'rxjs/Observable'

import { APP } from '../../config/constants'
import { updateResults } from '../utility'

const RxJsSampleDragAndDrop = {
  fetchUrl(isUrlInvalid) {
    const url = APP.REST_BASE_URL + '/to-dos' + (isUrlInvalid ? 'x' : '')
    const config = { method: 'GET' };
    const obs = Observable.fromPromise(
      fetch(url, config)
    ).switchMap(response => {
      if (response.ok) {
        return Observable.fromPromise(
          response.json()
        )
      } else {
        return Observable.throw(response)
      }
    })
    obs.subscribe(
      results => updateResults('Next', JSON.stringify(results, null, 2)),
      error => updateResults('Error', error.status + ' - ' + error.statusText),
      () => updateResults('Complete')
    )
  }
}

// HACK
window.RxJsSampleDragAndDrop = RxJsSampleDragAndDrop
window.RxJsSampleDragAndDrop.fetchUrl()
