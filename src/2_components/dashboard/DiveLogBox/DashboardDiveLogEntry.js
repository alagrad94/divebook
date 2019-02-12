import React, { Component } from 'react'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'
import { CardImg, CardTitle, Card } from 'reactstrap';

export default class DashboardDiveLogEntry extends Component {

  render () {
    return(
      <Card key={this.props.entry.id} className="db_divelog log_entry">
        <CardTitle className="db_divelog divesite_name">{this.props.entry.diveSite.name}<br />{this.props.entry.diveDate}</CardTitle>
        <CardImg bottom width="100%" src={PlaceholderImage} alt="" className="db_divelog divelog_photo"></CardImg>
      </Card>
    )
  }
}