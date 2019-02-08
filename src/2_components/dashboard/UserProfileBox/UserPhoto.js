import React, { Component } from 'react'
import PlaceholderImage from '../../../Placeholder.png'
export default class UserPhoto extends Component {

  render () {
    let currentUser = this.props.data.users.filter(user => user.id === this.props.user);
    return(
      currentUser.map(user =>
        <img src={PlaceholderImage} alt="" className="db_profile user_photo"></img>
      )
    )
  }
}