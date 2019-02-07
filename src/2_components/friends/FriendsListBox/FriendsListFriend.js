import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class FriendsListFriend extends Component {

  render () {
    return(
      this.props.friend.map(buddy =>
        <Link key={buddy.id} to={{pathname: `/friends/${buddy.id}`, buddy:{id: buddy.id}}}><p className="friends_list_friend_link" width="100%" className="logEntryLink" >{buddy.firstName} {buddy.lastName}<br /></p></Link>
      )
    )
  }
}