import React, { Component } from 'react'

export default class UserInterests extends Component {

  render () {
    let currentUser = this.props.data.users.filter(user => user.id === this.props.user)
    return(
      currentUser.map(user =>
        <div key={user.id} className="db_profile db_user_interests">{user.diveInterests}</div>
      )
    )
  }
}