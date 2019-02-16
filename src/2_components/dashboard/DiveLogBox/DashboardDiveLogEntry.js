import React, { Component } from 'react'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


export default class DashboardDiveLogEntry extends Component {

  render () {

    let coverPhoto = (this.props.entry.coverPhoto === "") ? PlaceholderImage : this.props.entry.coverPhoto

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
          <Link to={`/divelog/${this.props.entry.id}`}>
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