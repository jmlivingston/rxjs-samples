import React, { Component } from 'react';
import SampleContainer from './containers/SampleContainer'

class App extends Component {
  render () {
    return <div>
      <SampleContainer path='fetch' title='Fetch' />
    </div>
  }
}

export default App;
