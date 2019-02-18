import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class FriendsSearchResults extends Component {


	//Because divebook has a true "friend" relationship and utilizes an intersect table to record them, two records are created for each friendship.  This handles adding both of those records.
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
					<Button type="button" className="link-button friends_search search_button" href='#' onClick={() => this.addFriend(potentialFriend.id)}>{`Name: `}{potentialFriend.userName}</Button>
				</div>
			)}
		</section>
		)
	}
}