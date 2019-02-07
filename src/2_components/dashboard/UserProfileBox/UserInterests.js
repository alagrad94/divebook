import React, { Component } from 'react'

export default class UserInterests extends Component {

  render () {
    return(
      this.props.data.currentUser.map(user =>
        <p key={user.id} className="db_profile user_interests">{user.diveInterests}</p>
      )
    )
  }
}