import React, { Component } from 'react'
import divebookData from '../../1_modules/divebookData';

export default class FriendsSearchResults extends Component {


  addFriend = id => {

		let friendId = id;
		let currentUser = Number(sessionStorage.getItem("user"));
		let userToAddFriend;
		let friendToAddUser;

		divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `/${currentUser}`})
		.then(user => {
			userToAddFriend = user;
			userToAddFriend.friends.push(friendId)})
		.then(() => this.props.addFriend(currentUser, userToAddFriend))
		.then(() => divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `/${friendId}`}))
		.then(friend => {
			friendToAddUser = friend;
			friendToAddUser.friends.push(currentUser)})
		.then(() => this.props.addFriend(friendId, friendToAddUser))
	}

	render () {

		return (

			<section>
				<h2>Click A Users Name to Add as a Friend</h2>
			{
				this.props.friendSearchResults.map(potentialFriend =>
				<div key={potentialFriend.id} className="friendsSearchResults">
					<button className="link-button" href='#' onClick={() => this.addFriend(potentialFriend.id)}>{`Name: `}{potentialFriend.userName}</button>
				</div>
			)}
		</section>
		)
	}
}