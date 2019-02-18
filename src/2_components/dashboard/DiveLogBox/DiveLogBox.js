import React, { Component } from 'react'
import DashboardDiveLogEntry from './DashboardDiveLogEntry'
import divebookData from '../../../1_modules/divebookData'

export default class DiveLogBox extends Component {

  state = {
      diveLog: []
    }

  //This allows the dashboard element to be used as both the current user's dashboard as well as the friends display.  If the user passed to the component in props is the current user, then it sets the local state to be equal to the information already in state.  If not, it does a fetch and builds a diveLog for the user whose information is being displayed. The dashboard renders using the local state.
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
          diveLog.sort((a,b) => new Date(`${b.diveDate}T${b.diveStartTime}`) - new Date(`${a.diveDate}T${a.diveStartTime}`))
      })
      .then(() => this.setState({diveLog: diveLog}, () => null))
    }
  }
  componentDidMount(){
    this.userToDisplayDiveLog();
  }
  componentWillReceiveProps() {
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