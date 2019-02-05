import React, { Component } from 'react'

export default class UserPhoto extends Component {

  render () {
    return(
      <section>
        {
          this.props.data.currentUser.map(user =>
            <div key={user.id}>
            <h1>{user.userPhoto}</h1>
            </div>
          )
        }
      </section>
    )
  }
}