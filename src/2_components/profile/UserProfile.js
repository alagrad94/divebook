import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import PlaceholderImage from '../../images/userProfilePhotos/Placeholder.png'
import ProfilePhotoUploader from '../photos/ProfilePhotoUploader';

export default class UserProfile extends Component {

render() {
let profilePhoto = (this.props.data.photoUrl !== "") ? this.props.data.photoUrl : PlaceholderImage

  return(
    this.props.data.currentUser.map(user => (
      <section key={user.id} >
        <Card className="profile user_profile card_fix" style={{width: "40%"}}>
          <Image width="225px" height="225px" src={profilePhoto} alt="" className="user_photo"></Image>
          <ProfilePhotoUploader {...this.props}></ProfilePhotoUploader>
          <Card.Text className="profile user-name"><strong>{'Name:'}</strong> {user.firstName} {user.lastName}</Card.Text>
          <Card.Text className="profile cert_org"><strong>{'Certifying Organization:'}</strong> {user.certOrg}</Card.Text>
          <Card.Text className="profile cert_level"><strong>{'Certification Level:'}</strong> {user.certLevel}</Card.Text>
          <Card.Text className="profile user_location"><strong>{'Location:'}</strong> {user.city}, {user.state}, {user.zip}
          {user.country}</Card.Text>
          <Card.Text className="profile user_interests"><strong>{'Future Diving Goals:'}</strong>{user.diveInterests}</Card.Text>
        </Card>
          <Link className="button_link" to={{pathname: "/profile/edit", state: {fetch: "PUT", user: this.props.data.currentUser}}}><Button variant="outline-secondary" className="button profile_edit_profile_button">Edit Profile</Button></Link>
      </section>
    ))

    )
  }
}