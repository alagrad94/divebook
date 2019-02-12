import React, { Component } from 'react'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'
import { CardImg, CardTitle, Card } from 'reactstrap';
export default class DahsboardFriendDisplay extends Component {

  render () {

    return(
      <Card key={this.props.buddy.id} className="db-friends friend" >
        <CardTitle className="db_friends friend_name">{this.props.buddy.firstName} {this.props.buddy.lastName}</CardTitle>
        <CardImg bottom width="100%" src={PlaceholderImage} alt="" className="db_friends friend_photo" fluid="true"></CardImg>
      </Card>
    )
  }
}