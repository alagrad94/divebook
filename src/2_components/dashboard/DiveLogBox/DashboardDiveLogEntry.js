import React, { Component } from 'react'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'
import { CardImg, CardTitle, Card } from 'reactstrap'
import { Link } from 'react-router-dom'

export default class DashboardDiveLogEntry extends Component {

  render () {

    let coverPhoto = (this.props.entry.coverPhoto === "") ? PlaceholderImage : this.props.entry.coverPhoto

    return(
      <Card key={this.props.entry.id} className="db_divelog log_entry">
       <Link to={`/divelog/${this.props.entry.id}`}>
        <CardTitle className="db_divelog divesite_name"><strong>{this.props.entry.diveSite.name}<br />{this.props.entry.diveDate}</strong></CardTitle></Link>
        <CardImg bottom width="100%" src={coverPhoto} alt="" className="db_divelog divelog_photo"></CardImg>
      </Card>
    )
  }
}