import React, { Component } from 'react'
import UserPhoto from './UserPhoto'
import { Card } from 'reactstrap';
import UserProfileInfo from './UserProfileInfo'

export default class UserProfileBox extends Component {

  render () {

    return(
      <section className="db_profile prof_box">
        <Card className="db_profile prof_box">
          <UserPhoto className="db_profile user_photo" user={this.props.user} {...this.props} />
          <UserProfileInfo className="db_profile user_profile" user={this.props.user} {...this.props} />
        </Card>
      </section>
    )
  }
}