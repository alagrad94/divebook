import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import PlaceholderImage from '../../../images/userProfilePhotos/Placeholder.png'

export default class UserPhoto extends Component {
  render () {
    //This allows redering a placeholder image if the user has not uploaded a profile photo.
    let currentUser = this.props.data.users.filter(user => user.id === this.props.user);
    let currentUserPhoto = currentUser.map(user => user.userPhoto)[0]
    let profilePhoto = (currentUserPhoto === "") ? PlaceholderImage : currentUserPhoto

    return(
      <Image width="225px" height="225px" src={profilePhoto} alt="" className="db_profile user_photo"></Image>
    )
  }
}