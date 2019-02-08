import React, { Component } from 'react'
import DashboardFriendDisplay from './DashboardFriendDisplay'
import divebookData from '../../../1_modules/divebookData'
export default class FriendsBox extends Component {

  state = {
    friendsList: []
  }

  userToDisplayFriends () {

    if (this.props.user === Number(sessionStorage.getItem('user'))) {

      this.setState({friendsList: this.props.data.friends}, () => null)

    } else {

      let user = this.props.user
      let friendsList = [];
      divebookData.handleData({dataSet: "friends", fetchType: "GET", embedItem: `?userId=${user}`})
      .then(friends => {
      friends.map(friend =>
        this.props.data.users.filter(user => friend.friendId === user.id).forEach(buddy =>
          friendsList.push(buddy))
      )
      friendsList.sort((a,b) => a.lastName.localeCompare(b.lastName))
      })
      .then(() => this.setState({friendsList: friendsList}, () => null))

    }
  }

  componentDidMount() {
    this.userToDisplayFriends();
  }

  render () {

    return(
      <section className="db-friends friends_box">
      {
        this.state.friendsList.map(friend =>
        <DashboardFriendDisplay className="db-friends friend" key={friend.id} buddy={friend} {...this.props}/>)
      }
      </section>
    )
  }
}