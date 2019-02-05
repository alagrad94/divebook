import React, { Component } from 'react'

export default class FriendsListFriend extends Component {

  render () {
    return(
      this.props.friend.map(buddy =>
        <div key={buddy.id}>
        <h1>{buddy.firstName}{buddy.lastName}</h1>
        </div>
      )
    )
  }
}