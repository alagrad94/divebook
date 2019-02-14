import React, { Component } from 'react'
import PhotoAlbumsEntriesListEntry from './PhotoAlbumsEntriesListEntry'

export default class EntriesListBox extends Component {
  render () {
    return(
      this.props.data.diveLog.filter(entry => entry.coverPhoto !== "").map(entry =>
        <PhotoAlbumsEntriesListEntry className="dl_entry_link" key={entry.id} entry={[entry]} {...this.props}/>
      )
    )
  }
}