import React, { Component } from 'react'
import PlaceholderImage from '../../../Placeholder.png'

export default class DashboardDiveLogEntry extends Component {

  render () {
    return(
      <section>
        <div key={this.props.entry.id} className="db_divelog log_entry">
        <div className="db_divelog divesite_name">{this.props.entry.diveSite.name}</div>
        <div className="db_divelog dive_date">{this.props.entry.diveDate}</div>
        <img src={PlaceholderImage} alt="" className="db_divelog divelog_photo"></img>
        </div>
      </section>
    )
  }
}