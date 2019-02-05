import React, { Component } from 'react'
import DiveLogDiveDetails from './DiveLogDiveDetails'

export default class DiveDetailsBox extends Component {

  render () {
    return(
      <section>
      {
        this.props.data.diveLog.map(entry => (
          <DiveLogDiveDetails key={entry.id} entry={[entry]} {...this.props} />
          ))
      }
      </section>
    )
  }
}