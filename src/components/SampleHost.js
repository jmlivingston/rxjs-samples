import React, { Component } from 'react'

// import autoCompleteSample from '../samples/AutoComplete'

class SampleHost extends Component {
  state = {
    html: '<h1>Loading...</h1>',
    items: []
  }
  componentDidMount () {
    // autoCompleteSample(this.updateState)
    if (this.props.path) {
      this.setState({
        html: import('../samples/' + this.props.path + '/' + this.props.path + '.html')
      })
    }
  }
  // updateState = (results) => {
  //   this.setState({
  //     items: results
  //   })
  // }
  render () {
    return <div>
      <div dangerouslySetInnerHTML={{ __html: this.state.html }}></div>
      {/* {
        this.state.items && this.state.items.map(item => {
          return <div key={item.id}>{item.name}</div>
        })
      } */}
    </div>
  }
}

export default SampleHost