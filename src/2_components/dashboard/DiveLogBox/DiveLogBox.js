import React, { Component } from 'react'
import DashboardDiveLogEntry from './DashboardDiveLogEntry'
import divebookData from '../../../1_modules/divebookData'

export default class DiveLogBox extends Component {

  state = {
    diveLog: []
  }

  userToDisplayDiveLog () {

    if (this.props.user === Number(sessionStorage.getItem('user'))) {

      this.setState({diveLog: this.props.data.diveLog}, () => null)

    } else {

      let user = this.props.user
      let diveLog = [];
      divebookData.handleData({dataSet: "diveLogEntries", fetchType: "GET", embedItem: `?userId=${user}&_expand=waterType&_expand=diveType&_expand=diveSite&_expand=airMix&_expand=precipType`})
      .then(dives => {
        dives.filter(dive => dive.userId === user).forEach(dive =>
          diveLog.push(dive))
        diveLog.sort((a,b) => new Date(b.diveDate) - new Date(a.diveDate))
      })
      .then(() => this.setState({diveLog: diveLog}, () => null))

    }
  }

  componentDidMount() {
    this.userToDisplayDiveLog();
  }

  render () {
    return(
      <section className="db_divelog divelog_box">
      {
        this.state.diveLog.map(entry => (
        <DashboardDiveLogEntry className="db_divelog log_entry" key={entry.id} entry={entry} {...this.props}/>
        ))
      }
      </section>
    )
  }
}