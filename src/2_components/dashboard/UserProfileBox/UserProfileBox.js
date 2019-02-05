import React, { Component } from 'react'
import UserPhoto from './UserPhoto'
import UserInterests from './UserInterests'
import UserProfileInfo from './UserProfileInfo'

export default class UserProfileBox extends Component {

  render () {

    return(
      <section>
      <UserPhoto {...this.props} />
      <UserProfileInfo {...this.props} />
      <UserInterests {...this.props} />
      </section>
    )
  }
}