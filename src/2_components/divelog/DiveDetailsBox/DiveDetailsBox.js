import React, { Component } from 'react'
import DiveLogDiveDetails from './DiveLogDiveDetails'

export default class DiveDetailsBox extends Component {

  render () {
    let diveLogEntry = this.props.data.diveLog.filter(entry => entry.id === parseInt(this.props.match.params.id))

    return(
      <section className="dl_dive_details_box">
      {
        diveLogEntry.map(entry => (
          <DiveLogDiveDetails className="dl_dive_details" key={entry.id} entry={[entry]} {...this.props} />
          ))
      }
      </section>
    )
  }
}