import React, { Component } from 'react'
import FriendsFriendDisplay from './FriendsFriendDisplay';

export default class FriendsProfileBox extends Component {

  render () {
    return(
      this.props.data.friends.map(friend => (
        <FriendsFriendDisplay key={friend.id} friend={[friend]} />
      ))
    )
  }
}