import React, { Component } from 'react'
import PhotoAlbumsEntriesListEntry from './PhotoAlbumsEntriesListEntry'

export default class EntriesListBox extends Component {
  render () {
    // Doing the filter here allows rendering only divelog entries that actually have photos in the list of albums
    return(
      this.props.data.diveLog.filter(entry => entry.coverPhoto !== "").map(entry =>
        <PhotoAlbumsEntriesListEntry className="dl_entry_link" key={entry.id} entry={[entry]} {...this.props}/>
      )
    )
  }
}