import React, { Component } from 'react'
import DashboardFriendDisplay from './DashboardFriendDisplay'

export default class FriendsBox extends Component {

  render () {
    return(
      <section className="friendsBox">
      {
      this.props.data.friends.map(friend => (
      <DashboardFriendDisplay key={friend.id} friend={friend.id} {...this.props}/>
      ))
      }
      </section>
    )
  }
}