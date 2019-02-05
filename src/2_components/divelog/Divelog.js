import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EntriesListBox from './EntriesListBox/EntriesListBox'
import DiveDetailsBox from './DiveDetailsBox/DiveDetailsBox'

export default class Divelog extends Component {

  render () {
    return(
      <React.Fragment>
        <EntriesListBox {...this.props} />
        <DiveDetailsBox {...this.props} />
        <Link to={{pathname: "/divelogentry/new", state: {fetch: "POST"}}}><button>Add New Dive</button></Link>
      </React.Fragment>
    )
  }
}