import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'reactstrap';
import Image from 'react-bootstrap/Image'
import PlaceholderImage from '../../images/userProfilePhotos/Placeholder.png'
import ProfilePhotoUploader from '../photos/ProfilePhotoUploader';

export default class UserProfile extends Component {

render() {
let profilePhoto = (this.props.data.photoUrl !== "") ? this.props.data.photoUrl : PlaceholderImage

  return(

    this.props.data.currentUser.map(user => (
      <Card key={user.id} className="profile user_profile card_fix" style={{width: "50%"}}>
        <Image width="25%" height="25%" src={profilePhoto} alt="" className="db_profile user_photo"></Image>
        <CardText className="profile user-name">{'Name:'} {user.firstName} {user.lastName}</CardText>
        <CardText className="profile cert_org">{'Certifying Organization:'} {user.certOrg}</CardText>
        <CardText className="profile cert_level">{'Certification Level:'} {user.certLevel}</CardText>
        <CardText className="profile user_location">{'Location:'} {user.city}, {user.state}, {user.zip}
        {user.country}</CardText>
        <CardText className="profile user_interests">{user.CardTexteInterests}</CardText>
        <Link to={{pathname: "/profile/edit", state: {fetch: "PUT", user: this.props.data.currentUser}}}><button className="button profile_edit_profile_button">Edit Profile</button></Link>
        <ProfilePhotoUploader {...this.props}></ProfilePhotoUploader>
      </Card>
    ))

    )
  }
}