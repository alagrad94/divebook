import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class UserProfile extends Component {

  render() {

    return(

      this.props.data.currentUser.map(user => (
        <div key={user.id}>
        <h1 >{user.firstName} {user.lastName}</h1>
        <Link to={{pathname: "/profile/edit", state: {fetch: "PUT", user: this.props.data.currentUser}}}><button>Edit Profile</button></Link>
        </div>
      ))

    )
  }
}