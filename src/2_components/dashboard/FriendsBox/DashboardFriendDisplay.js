import React, { Component } from 'react'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
export default class DahsboardFriendDisplay extends Component {

  render () {

    //This allows redering a placeholder image if the user has not uploaded a profile photo.
    let thisUser = this.props.data.users.filter(user => user.id === this.props.buddy.id);
    let thisUserPhoto = thisUser.map(user => user.userPhoto)[0]
    let profilePhoto = (thisUserPhoto === "") ? PlaceholderImage : thisUserPhoto

    //This makes the friends of the user's friend render only as a card without the link.  This is done because the friends in state only refelect the friends of the current user.  Thus, if you try to link to a friend of your friend, that person's record may/may not be in state and if not would display a blank page.

    let FriendEntry = () => {

      if (this.props.user !== parseInt(sessionStorage.getItem('user'))) {

        return (
          <Card key={this.props.buddy.id} className="db-friends friend" >
            <Card.Body>
              <Card.Title className="db_friends friend_name"><strong>{this.props.buddy.firstName} {this.props.buddy.lastName}</strong></Card.Title>
              <Card.Img width="100%" src={profilePhoto} alt="" className="db_friends friend_photo" fluid="true"></Card.Img>
            </Card.Body>
          </Card>
        )
      } else {

        return (
          <Card key={this.props.buddy.id} className="db-friends friend" >
            <Card.Body>
              <Link className="friend_link" to={`/friends/${this.props.buddy.id}`}>
              <Card.Title className="db_friends friend_name"><strong>{this.props.buddy.firstName} {this.props.buddy.lastName}</strong></Card.Title></Link>
              <Card.Img width="100%" src={profilePhoto} alt="" className="db_friends friend_photo" fluid="true"></Card.Img>
            </Card.Body>
          </Card>
        )
      }
    }

    return <FriendEntry></FriendEntry>
  }
}