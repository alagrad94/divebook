import React, { Component } from 'react'
import DashboardFriendDisplay from './DashboardFriendDisplay'

export default class FriendsBox extends Component {

  render () {
    return(
      <section className="db-friends friends_box">
      {
      this.props.data.friends.map(friend => (
      <DashboardFriendDisplay className="db-friends friend" key={friend.id} friend={friend.id} {...this.props}/>
      ))
      }
      </section>
    )
  }
}