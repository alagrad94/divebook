import React, { Component } from 'react'

export default class UserProfileInfo extends Component {

  render () {
    let currentUser = this.props.data.users.filter(user => user.id === this.props.user)
    return(
     <section>
      {
        currentUser.map(user =>
          <div key={user.id} className="db_profile db_user_profile">
          <div className="db_profile user-name">{'Name:'} {user.firstName} {user.lastName}</div><br />
          <div className="db_profile cert_org">{'Certifying Organization:'} {user.certOrg}</div><br />
          <div className="db_profile cert_level">{'Certification Level:'} {user.certLevel}</div><br />
          <div className="db_profile user_location">{'Location:'} {user.city}, {user.state}, {user.zip}, {user.country}</div>
          </div>
        )
      }
       </section>
    )
  }
}