import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PlaceholderImage from '../../Placeholder.png'

export default class UserProfile extends Component {

  render() {

    return(

      this.props.data.currentUser.map(user => (
        <div key={user.id} className="profile user_profile">
          <img src={PlaceholderImage} alt="" className="db_profile user_photo"></img>
          <div className="profile user-name">{'Name:'} {user.firstName} {user.lastName}</div>
          <div className="profile cert_org">{'Certifying Organization:'} {user.certOrg}</div>
          <div className="profile cert_level">{'Certification Level:'} {user.certLevel}</div>
          <div className="profile user_location">{'Location:'} {user.city}, {user.state}, {user.zip}
          {user.country}</div>
          <div className="profile user_interests">{user.diveInterests}</div>


        <Link to={{pathname: "/profile/edit", state: {fetch: "PUT", user: this.props.data.currentUser}}}><button className="button profile_edit_profile_button">Edit Profile</button></Link>
        </div>
      ))

    )
  }
}