import React, { Component } from 'react'
import FriendsListFriend from './FriendsListFriend'

export default class FriendsListBox extends Component {

  render () {
    return(
      this.props.data.friends.map(friend => (
        <FriendsListFriend key={friend.id} friend={[friend]} />
        ))
    )
  }
}