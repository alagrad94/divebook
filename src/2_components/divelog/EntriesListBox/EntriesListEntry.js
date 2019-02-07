import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class EntriesListEntry extends Component {

  render () {
    return(

      this.props.entry.map(log =>
        <Link key={log.id} to={{pathname: `/divelog/${log.id}`, log:{id: log.id}}}><p width="100%" className="dl_entry_link" >{log.diveSite.name} {log.diveDate}<br /></p></Link>
      )
    )
  }
}