import React, { Component } from 'react'

export default class UserProfileInfo extends Component {

  render () {
    return(
      <section>
      {
        this.props.data.currentUser.map(user =>
          <div key={user.id}>
          <h1>{user.firstName}{user.lastName}</h1>
          </div>
        )
      }
    </section>
    )
  }
}