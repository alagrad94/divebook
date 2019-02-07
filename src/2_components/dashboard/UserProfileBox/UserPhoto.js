import React, { Component } from 'react'

export default class UserPhoto extends Component {

  render () {
    return(
      this.props.data.currentUser.map(user =>
        <div key={user.id} className="db_profile user_photo">{user.userPhoto}</div>
      )
    )
  }
}