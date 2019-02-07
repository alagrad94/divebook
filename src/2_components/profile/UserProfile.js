import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class UserProfile extends Component {

  render() {

    return(

      this.props.data.currentUser.map(user => (
        <div key={user.id} className="profile user_profile">
          <p className="profile user-name">{'Name:'} {user.firstName} {user.lastName}</p><br />
          <p className="profile cert_org">{'Certifying Organization:'} {user.certOrg}</p><br />
          <p className="profile cert_level">{'Certification Level:'} {user.certLevel}</p><br />
          <p className="profile user_location">{'Location:'} {user.city}, {user.state}, {user.zip}<br />
          {user.country}</p>
          <p className="profile user_interests">{user.diveInterests}</p>
          <div className="profile user_photo">{user.userPhoto}</div>


        <Link to={{pathname: "/profile/edit", state: {fetch: "PUT", user: this.props.data.currentUser}}}><button className="button profile_edit_profile_button">Edit Profile</button></Link>
        </div>
      ))

    )
  }
}