import React, { Component } from 'react'
import EntriesListEntry from './EntriesListEntry'

export default class EntriesListBox extends Component {
  render () {
    return(
      this.props.data.diveLog.map(entry => (
        <EntriesListEntry key={entry.id} entry={[entry]} {...this.props}/>
        ))
    )
  }
}