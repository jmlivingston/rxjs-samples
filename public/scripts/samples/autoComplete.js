const sample = {
  init: (inputId) => {
    const baseUrl = constants.APP.REST_BASE_URL + '/countries'
    const config = { method: 'GET' };
    const minCharacters = 3

    // Observable from fetch promise
    const searchByValue = value => (Rx.Observable.fromPromise(
        fetch(baseUrl + '?country_like=' + value, config)
      ).switchMap(response => {
        if (response.ok) {
          return Rx.Observable.fromPromise(response.json())
        } else {
          return Rx.Observable.throw(response)
        }
      })
    )

    // Observable from keyup event
    const obs = Rx.Observable.fromEvent(document.getElementById(inputId), 'keyup')
      .map(e => e.target.value)
      .filter(text => text.length >= minCharacters)
      .debounceTime(750)
      .distinctUntilChanged()
      .switchMap(searchByValue)

    // Subscribe and print
    obs.subscribe(
      results => utility.updateResults('Next', JSON.stringify(results, null, 2)),
      error => utility.updateResults('Error', error.status + ' - ' + error.statusText),
      () => utility.updateResults('Complete')
    )
  }
}