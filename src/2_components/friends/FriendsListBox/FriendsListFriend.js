import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class FriendsListFriend extends Component {

  render () {
    return(
      this.props.friend.map(buddy =>
        <Link to={{pathname: `/friends/${buddy.id}`, buddy:{id: buddy.id}}}><h5 key={buddy.id} width="100%" className="logEntryLink" >{buddy.firstName} {buddy.lastName}<br /></h5></Link>
      )
    )
  }
}