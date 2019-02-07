import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import SplitterLayout from 'react-splitter-layout'
import UserProfileBox from '../../dashboard/UserProfileBox/UserProfileBox'
import DiveLogBox from '../../dashboard/DiveLogBox/DiveLogBox'
import FriendsBox from '../../dashboard/FriendsBox/FriendsBox'

export default class FriendsFriendDisplay extends Component {

  deleteFriend(id) {

		let currentUser = Number(sessionStorage.getItem("user"));
		let userToRemoveFriend;
		let friendToRemoveUser = id[0];
		let friendId = friendToRemoveUser.id;

		divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `/${currentUser}`})
		.then(user => {
			userToRemoveFriend = user;
			userToRemoveFriend.friends.pop(friendId)})
		.then(() => this.props.deleteFriend(currentUser, userToRemoveFriend))
		.then(() => friendToRemoveUser.friends.pop(currentUser))
		.then(() => this.props.deleteFriend(friendId, friendToRemoveUser))
  }

  render () {
    return(
			<SplitterLayout vertical percentage={true} secondaryInitialSize={30}>
				<SplitterLayout percentage={true} secondaryInitialSize={50}>
				<div className="my-pane">
					<UserProfileBox className="friends_profile friend_user_profile_box" user={2} data={this.props.data} />
				</div>
				<div className="my-pane">
					<DiveLogBox className="friends_profile friend_divelog_box"  user={2} data={this.props.data} />
				</div>
				</SplitterLayout>
				<div className="my-pane">
					<FriendsBox className="friends_profile friend_friends_box"  user={2} data={this.props.data} />
				</div>
			</SplitterLayout>
			// this.props.friend.map(friend =>
			// <div key={friend.id}>
			// <h1>{friend.firstName} {friend.lastName}</h1>
			// <button type="button" onClick={() => this.deleteFriend(this.props.friend)}>Remove Friend</button>
			// </div>
			// )
    )
  }
}