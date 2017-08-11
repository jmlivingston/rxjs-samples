const utility = {
  updateResults: (status, results) => {
    document.getElementById('status').innerText = ' - ' + status
    if (results) {
      document.getElementById('results').innerText = results
    }
  }
}