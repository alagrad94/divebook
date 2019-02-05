import React, { Component } from 'react'

export default class UserInterests extends Component {

  render () {
    return(
      <section>
      {
        this.props.data.currentUser.map(user =>
          <div key={user.id}>
          <h1>{user.diveInterests}</h1>
          </div>
        )}
    </section>
    )
  }
}