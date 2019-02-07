import React, { Component } from 'react'
import DashboardDiveLogEntry from './DashboardDiveLogEntry'
export default class DiveLogBox extends Component {

  render () {
    return(
      <section className="db_divelog divelog_box">
      {
        this.props.data.diveLog.map(entry => (
        <DashboardDiveLogEntry className="db_divelog log_entry" key={entry.id} entry={entry.id} {...this.props}/>
        ))
      }
      </section>
    )
  }
}