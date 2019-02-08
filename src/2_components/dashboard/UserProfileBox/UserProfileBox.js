import React, { Component } from 'react'
import UserPhoto from './UserPhoto'
import UserInterests from './UserInterests'
import UserProfileInfo from './UserProfileInfo'

export default class UserProfileBox extends Component {

  render () {

    return(
      <section className="db_profile prof_box">
      <UserPhoto className="db_profile user_photo" user={this.props.user} {...this.props} />
      <UserProfileInfo className="db_profile user_profile" user={this.props.user} {...this.props} />
      <UserInterests className="db_profile user_interests" user={this.props.user} {...this.props} />
      </section>
    )
  }
}