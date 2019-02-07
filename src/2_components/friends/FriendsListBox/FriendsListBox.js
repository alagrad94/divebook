import React, { Component } from 'react'
import FriendsListFriend from './FriendsListFriend'

export default class FriendsListBox extends Component {

  render () {
    return(
      this.props.data.friends.map(friend => (
        <FriendsListFriend className="friends_list_friend_link" key={friend.id} friend={[friend]} {...this.props}/>
        ))
    )
  }
}