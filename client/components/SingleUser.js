import React from 'react'
import {connect} from 'react-redux'

class SingleStudent extends React.Component {
  constructor() {
    super()
  }

  render() {
    console.log(this.props.state)
    return <div />
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

export default connect(mapStateToProps)(SingleStudent)
