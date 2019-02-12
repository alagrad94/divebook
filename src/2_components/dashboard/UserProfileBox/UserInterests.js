import React, { Component } from 'react'
import {CardText } from 'reactstrap';

export default class UserInterests extends Component {

  render () {
    let currentUser = this.props.data.users.filter(user => user.id === this.props.user)
    return(
      currentUser.map(user =>
        <CardText key={user.id} className="db_profile db_user_interests">{user.diveInterests}</CardText>
      )
    )
  }
}