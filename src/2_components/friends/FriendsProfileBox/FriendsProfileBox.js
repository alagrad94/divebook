import React, { Component } from 'react'
import FriendsFriendDisplay from './FriendsFriendDisplay';

export default class FriendsProfileBox extends Component {

  render () {

    let friendToDisplay = this.props.data.friends.filter(friend => friend.id === parseInt(this.props.match.params.id))

    return(
      friendToDisplay.map(friend => (
        <FriendsFriendDisplay key={friend.id} friend={friend.id} deleteFriend={this.props.deleteFriend} {...this.props}/>
        ))
    )
  }
}