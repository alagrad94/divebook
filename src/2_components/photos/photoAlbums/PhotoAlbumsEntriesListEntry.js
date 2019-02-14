import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PhotoAlbumsEntriesListEntry extends Component {

  render () {
    return(

      this.props.entry.map(log =>
        <Link key={log.id} to={{pathname: `/photos/${log.id}`, log:{id: log.id}}}><p width="100%" className="dl_entry_link" >{log.diveSite.name}<br />{log.diveDate}</p></Link>
      )
    )
  }
}