import React, { Component } from 'react'

export default class FriendsSearchResults extends Component {


  addFriend = id => {

		let friendId = id;
		let currentUser = Number(sessionStorage.getItem("user"));

		let userToAddFriend = {
			userId: currentUser,
			friendId: friendId
		}

		let friendToAddUser = {
			userId: friendId,
			friendId: currentUser
		}
		this.props.addFriend(userToAddFriend)
		.then(() => this.props.addFriend(friendToAddUser))
	}

	render () {

		return (

			<section>
				<h2>Click A Users Name to Add as a Friend</h2>
			{
				this.props.friendSearchResults.map(potentialFriend =>
				<div key={potentialFriend.id} className="friends_search friend_search_results">
					<button className="link-button friends_search search_button" href='#' onClick={() => this.addFriend(potentialFriend.id)}>{`Name: `}{potentialFriend.userName}</button>
				</div>
			)}
		</section>
		)
	}
}