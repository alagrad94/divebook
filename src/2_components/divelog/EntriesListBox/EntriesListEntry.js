import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class EntriesListEntry extends Component {

  render () {
    return(

      this.props.entry.map(log =>
        <Link key={log.id} to={{pathname: `/divelog/${log.id}`, log:{id: log.id}}}><h5 width="100%" className="logEntryLink" >{log.diveSite.name} {log.diveDate}<br /></h5></Link>
      )
    )
  }
}