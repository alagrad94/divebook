import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'

export default class UserPhoto extends Component {
  render () {

    let currentUser = this.props.data.users.filter(user => user.id === this.props.user);
    let currentUserPhoto = currentUser.map(user => user.userPhoto)[0]
    let profilePhoto = (currentUserPhoto === "") ? PlaceholderImage : currentUserPhoto

    return(
      <Image width="50%" height="25%" src={profilePhoto} alt="" className="db_profile user_photo"></Image>
    )
  }
}