import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DiveLogDiveDetails extends Component {

  render () {
    return(

      this.props.entry.map(log =>
        <div key={log.id}>
        <h1>{log.diveSite.name}</h1>
        <Link to={{pathname: `/divelog/${log.id}/edit`, state: {fetch: "PUT", diveLog: this.props.data.diveLog}}}><button>Edit Log Entry</button></Link>
        <button type="button" onClick={()=> this.props.deleteLogEntry(log.id)} >Delete Log Entry</button>
        </div>
      )
    )
  }
}