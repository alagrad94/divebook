import React, { Component } from 'react'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


export default class DashboardDiveLogEntry extends Component {

  render () {

     //This allows redering a placeholder image if the user has not uploaded a profile photo.
    let coverPhoto = (this.props.entry.coverPhoto === "") ? PlaceholderImage : this.props.entry.coverPhoto

    //This makes the divelog of the user's friend render only as a card without the link.  This is done because the divelog in state only refelects the log entries of the current user.  Thus, if you try to link to a divelog of your friend, that record is not in state and would display a blank page.
    let DiveLogEntry = () => {
      if (this.props.user !== parseInt(sessionStorage.getItem('user'))) {

        return (
          <Card key={this.props.entry.id} className="db_divelog log_entry">
          <Card.Body>
            <Card.Title className="db_divelog divesite_name"><strong>{this.props.entry.diveSite.name}<br />{this.props.entry.diveDate}</strong></Card.Title>
            <Card.Img width="100%" src={coverPhoto} alt="" className="db_divelog divelog_photo"></Card.Img>
          </Card.Body>
          </Card>
        )
      } else {

        return (
          <Card key={this.props.entry.id} className="db_divelog log_entry">
          <Card.Body>
          <Link className="divelog_link" to={`/divelog/${this.props.entry.id}`}>
            <Card.Title className="db_divelog divesite_name"><strong>{this.props.entry.diveSite.name}<br />{this.props.entry.diveDate}</strong></Card.Title></Link>
            <Card.Img width="100%" src={coverPhoto} alt="" className="db_divelog divelog_photo"></Card.Img>
          </Card.Body>
          </Card>
        )
      }
    }

   return <DiveLogEntry></DiveLogEntry>
  }
}