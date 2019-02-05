import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import Dashboard from '../../dashboard/Dashboard'

export default class FriendsFriendDisplay extends Component {

  deleteFriend(id) {

    let friendId = id;
		let currentUser = Number(sessionStorage.getItem("user"));
		let userToRemoveFriend;
		let friendToRemoveUser;

		divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `/${currentUser}`})
		.then(user => {
			userToRemoveFriend = user;
			userToRemoveFriend.friends.pop(friendId)})
		.then(() => this.props.deleteFriend(currentUser, userToRemoveFriend))
		.then(() => divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `/${friendId}`}))
		.then(friend => {
			friendToRemoveUser = friend;
			friendToRemoveUser.friends.pop(currentUser)
			console.log(friendToRemoveUser)})
		.then(() => this.props.deleteFriend(friendId, friendToRemoveUser))

		this.props.history.push("/friends")
  }

  render () {
    return(
      <section>Hi I'm a friend<button type="button" onClick={() => this.deleteFriend(this.props.friend)}>Remove Friend</button></section>
    )
  }
}