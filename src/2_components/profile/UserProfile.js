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
      <section key={user.id} >
        <Card className="profile user_profile card_fix" style={{width: "40%"}}>
          <Image width="225px" height="225px" src={profilePhoto} alt="" className="db_profile user_photo"></Image>
          <ProfilePhotoUploader {...this.props}></ProfilePhotoUploader>
          <CardText className="profile user-name"><strong>{'Name:'}</strong> {user.firstName} {user.lastName}</CardText>
          <CardText className="profile cert_org"><strong>{'Certifying Organization:'}</strong> {user.certOrg}</CardText>
          <CardText className="profile cert_level"><strong>{'Certification Level:'}</strong> {user.certLevel}</CardText>
          <CardText className="profile user_location"><strong>{'Location:'}</strong> {user.city}, {user.state}, {user.zip}
          {user.country}</CardText>
          <CardText className="profile user_interests"><strong>{'Future Diving Goals:'}</strong>{user.diveInterests}</CardText>
        </Card>
          <Link className="button_link" to={{pathname: "/profile/edit", state: {fetch: "PUT", user: this.props.data.currentUser}}}><button className="button profile_edit_profile_button">Edit Profile</button></Link>
      </section>
    ))

    )
  }
}