import React, { Component } from 'react'
import AlbumDetails from './AlbumDetails'

export default class AlbumDetailsBox extends Component {

  render () {
    let diveLogEntry = this.props.data.diveLog.filter(entry => entry.id === parseInt(this.props.match.params.id))

    return(
      <section className="dl_album_details_box">
      {
        diveLogEntry.map(entry => (
          <AlbumDetails className="dl_album_details" key={entry.id} entry={[entry]} {...this.props} />
          ))
      }
      </section>
    )
  }
}