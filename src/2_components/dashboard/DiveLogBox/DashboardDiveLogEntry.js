import React, { Component } from 'react'

export default class DashboardDiveLogEntry extends Component {

  render () {
    return(
      <section>
        {
          this.props.data.diveLog.filter(entry => entry.id === this.props.entry).map(entry =>
          <div key={entry.id} className="db_divelog log_entry">
          <p className="db_divelog divesite_name">{'Dive Site:'} {entry.diveSite.name}</p>
          <p className="db_divelog dive_date">{'Date:'} {entry.diveSite.date}</p>
          </div>
          )
        }
      </section>
    )
  }
}