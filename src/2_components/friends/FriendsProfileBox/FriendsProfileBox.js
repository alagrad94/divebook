import React, { Component } from 'react'
import FriendsFriendDisplay from './FriendsFriendDisplay';

export default class FriendsProfileBox extends Component {

  render () {

    let friendToDisplay = this.props.data.friends.filter(friend => friend.id === parseInt(this.props.match.params.id))

    return(
      <section>
      {
      friendToDisplay.map(friend => (
        <FriendsFriendDisplay key={friend.id} friend={[friend]} deleteFriend={this.props.deleteFriend} {...this.props}/>
        ))
      }
      </section>
    )
  }
}