import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class FriendsListFriend extends Component {

  render () {
    return(
      this.props.buddy.map(friend =>
        <Link key={friend.id} to={{pathname: `/friends/${friend.id}`, friend:{id: friend.id}}}><p className="friends_list_friend_link" width="100%" >{friend.firstName} {friend.lastName}</p></Link>
      )
    )
  }
}