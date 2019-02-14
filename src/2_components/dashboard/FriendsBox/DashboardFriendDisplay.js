import React, { Component } from 'react'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'
import { CardImg, CardTitle, Card } from 'reactstrap'
import { Link } from 'react-router-dom'
export default class DahsboardFriendDisplay extends Component {

  render () {

    let thisUser = this.props.data.users.filter(user => user.id === this.props.buddy.id);
    let thisUserPhoto = thisUser.map(user => user.userPhoto)[0]
    let profilePhoto = (thisUserPhoto === "") ? PlaceholderImage : thisUserPhoto

    return(
      <Card key={this.props.buddy.id} className="db-friends friend" >
      <Link to={`/friends/${this.props.buddy.id}`}>
        <CardTitle className="db_friends friend_name"><strong>{this.props.buddy.firstName} {this.props.buddy.lastName}</strong></CardTitle></Link>
        <CardImg bottom width="100%" src={profilePhoto} alt="" className="db_friends friend_photo" fluid="true"></CardImg>
      </Card>
    )
  }
}