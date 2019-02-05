import React, { Component } from 'react'
import DashboardDiveLogEntry from './DashboardDiveLogEntry'

export default class DiveLogBox extends Component {

  render () {
    return(
      this.props.data.diveLog.map(entry => (
      <DashboardDiveLogEntry key={entry.id} entry={entry.id} {...this.props}/>
    )))
  }
}