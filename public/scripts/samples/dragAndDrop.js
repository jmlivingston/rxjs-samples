const sample = {
  fetchUrl: (isUrlInvalid) => {
    const url = isUrlInvalid ? 'not-a-url' : constants.APP.REST_BASE_URL + '/to-dos'
    const config = { method: 'GET' };

    const obs = Rx.Observable.fromPromise(
      fetch(url, config)
    ).switchMap(response => {
      if (response.ok) {
        return Rx.Observable.fromPromise(
          response.json()
        )
      } else {
        return Rx.Observable.throw(response)
      }
    })
    
    obs.subscribe(
      results => utility.updateResults('Next', JSON.stringify(results, null, 2)),
      error => utility.updateResults('Error', error.status + ' - ' + error.statusText),
      () => utility.updateResults('Complete')
    )
  },
  init: () => {
    sample.fetchUrl()
  }
}