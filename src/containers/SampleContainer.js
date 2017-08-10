import React, { Component } from 'react'

class SampleContainer extends Component {
  state = {
    html: '<h1>Loading...</h1>',
    js: ''
  }
  componentDidMount () {
    if (this.props.path) {
      import('../samples/' + this.props.path + '/' + this.props.path + '.html').then(html => {
        this.setState({ html })
      })
      import('../samples/' + this.props.path + '/' + this.props.path + '.js');
      import('raw-loader!../samples/' + this.props.path + '/' + this.props.path + '.js').then(js => {
        this.setState({ js: js.split('// HACK')[0] }) // Hide hack
      })
    }
  }
  render () {
    return <div className='container'>
      <h1>{this.props.title}</h1>
      <hr />
      <div className='row'>
        <div className='col-sm-4'>
          <div dangerouslySetInnerHTML={{ __html: this.state.html }} />
          <hr />
          <h2>Results<span id="status"></span></h2>
          <pre><code id="results"></code></pre>
        </div>
        <div className='col-sm-8'>
          <pre><code dangerouslySetInnerHTML={{ __html: this.state.js }} /></pre>
        </div>
      </div>
    </div>
  }
}

export default SampleContainer
