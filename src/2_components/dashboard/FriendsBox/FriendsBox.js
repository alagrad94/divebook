import React, { Component } from 'react'
import DashboardFriendDisplay from './DashboardFriendDisplay'
import divebookData from '../../../1_modules/divebookData'

export default class FriendsBox extends Component {

  state = {
    friendsList: []
  }

  //This allows the dashboard element to be used as both the current user's dashboard as well as the friends display.  If the user passed to the component in props is the current user, then it sets the local state to be equal to the information already in state.  If not, it does a fetch and builds a friendsList for the user whose information is being displayed. The dashboard renders using the local state.
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
  componentDidMount(){
    this.userToDisplayFriends();
  }
  componentWillReceiveProps() {
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