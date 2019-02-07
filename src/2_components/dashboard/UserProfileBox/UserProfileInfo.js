import React, { Component } from 'react'

export default class UserProfileInfo extends Component {

  render () {
    return(
     <section>
      {
        this.props.data.currentUser.map(user =>
          <div key={user.id} className="db_profile user_profile">
          <p className="db_profile user-name">{'Name:'} {user.firstName} {user.lastName}</p><br />
          <p className="db_profile cert_org">{'Certifying Organization:'} {user.certOrg}</p><br />
          <p className="db_profile cert_level">{'Certification Level:'} {user.certLevel}</p><br />
          <p className="db_profile user_location">{'Location:'} {user.city}, {user.state}, {user.zip}<br />
          {user.country}</p>
          </div>
        )
      }
       </section>
    )
  }
}