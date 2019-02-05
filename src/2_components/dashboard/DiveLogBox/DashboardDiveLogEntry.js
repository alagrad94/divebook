import React, { Component } from 'react'

export default class DashboardDiveLogEntry extends Component {

  render () {


    return(
      <section>
        {
          this.props.data.diveLog.filter(entry => entry.id === this.props.entry).map(entry =>
            <div key={entry.id}>
            <h1>{entry.diveSite.name}</h1>
            </div>
          )
        }
      </section>
    )
  }
}