import React, { Component } from 'react'

export default class UserProfileInfo extends Component {

  render () {
    let currentUser = this.props.data.users.filter(user => user.id === this.props.user)
    return(

        currentUser.map(user =>
          <div key={user.id} className="card w-75 db_profile db_user_profile" style={{width: "75%", marginTop: "5px", marginLeft: "5px"}}>
          <div className="db_profile user-name">{'Name:'} {user.firstName} {user.lastName}</div>
          <div className="db_profile cert_org">{'Certifying Organization:'} {user.certOrg}</div>
          <div className="db_profile cert_level">{'Certification Level:'} {user.certLevel}</div>
          <div className="db_profile user_location">{'Location:'} {user.city}, {user.state}, {user.zip}, {user.country}</div>
          <div className="db_profile db_user_interests">{user.diveInterests}</div>
          </div>
          )
    )
  }
}