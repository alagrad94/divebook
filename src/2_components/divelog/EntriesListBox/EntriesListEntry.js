import React, { Component } from 'react'

export default class EntriesListEntry extends Component {

  render () {
    return(

      this.props.entry.map(log =>
        <div key={log.id}>
        <h1>{log.diveSite.name}{log.date}</h1>
        </div>
      )
    )
  }
}