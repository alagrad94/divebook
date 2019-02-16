import React, { Component } from 'react'

export default class UserProfileInfo extends Component {

  render () {
    let currentUser = this.props.data.users.filter(user => user.id === this.props.user)

    return(

        currentUser.map(user =>
          <div key={user.id} className="card w-75 db_profile db_user_profile" >
          <div className="db_profile user_name"><strong>{'Name:'}</strong> {user.firstName} {user.lastName}</div>
          <div className="db_profile cert_org"><strong>{'Certifying Organization:'}</strong> {user.certOrg}</div>
          <div className="db_profile cert_level"><strong>{'Certification Level:'}</strong> {user.certLevel}</div>
          <div className="db_profile user_location"><strong>{'Location:'}</strong> {user.city}, {user.state}, {user.zip}, {user.country}</div>
          <div className="db_profile db_user_interests"><strong>{'Future Diving Goals:'}</strong>{user.diveInterests}</div>
          </div>
          )
    )
  }
}