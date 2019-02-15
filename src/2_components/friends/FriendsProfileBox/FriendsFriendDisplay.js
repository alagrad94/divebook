import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import UserProfileBox from '../../dashboard/UserProfileBox/UserProfileBox'
import DiveLogBox from '../../dashboard/DiveLogBox/DiveLogBox'
import FriendsBox from '../../dashboard/FriendsBox/FriendsBox'
import { Box, Grid} from 'grommet'

export default class FriendsFriendDisplay extends Component {

  deleteFriend(id) {

		let currentUser = Number(sessionStorage.getItem("user"));
		let friendId = id;
		let recordsToDelete = []

		divebookData.handleData({dataSet: "friends", fetchType: "GET", embedItem: `?userId=${currentUser}&friendId=${friendId}`})
		.then(connection => {
			connection.forEach(record => {recordsToDelete.push(record.id)});
		})
		.then(() => 	divebookData.handleData({dataSet: "friends", fetchType: "GET", embedItem: `?userId=${friendId}&friendId=${currentUser}`}))
		.then(connection => {
			connection.forEach(record => {recordsToDelete.push(record.id)});
		})
		.then(() => recordsToDelete.forEach(record => {
			this.props.deleteFriend(record)
		}))
  }

  render () {
    return(
			<Grid className="friends_grid"
				areas ={[
					{name: 'profile', start: [0,0], end: [0,1]},
					{name: 'divelog', start: [1,0], end: [2,0]},
					{name: 'friends', start: [0,1], end: [2,1]}
				]}
				columns={['30%', '780%']}
				rows={['75%', '25%']}
				gap='none'
			>
				<Box gridArea='profile' background='none' className="db_grid_left">
					<UserProfileBox className="profile prof_box" user={this.props.friend} data={this.props.data} />
				</Box>

				<Box gridArea='divelog' background='none' className="db_grid_right">
					<DiveLogBox className="db_divelog divelog_box card-deck" user={this.props.friend} data={this.props.data} />
				</Box>

				<Box gridArea='friends' background='none' className="db_grid_bottom">
					<FriendsBox className="db_friends friends_box card-deck" user={this.props.friend} data={this.props.data} />
				</Box>
		</Grid>
			// <SplitterLayout vertical percentage={true} secondaryInitialSize={30}>
			// 	<SplitterLayout percentage={true} secondaryInitialSize={70}>
			// 	<div className="my-pane">
			// 		<div className="friend_user_profile_box">
			// 		<UserProfileBox className="friends_profile friend_user_profile_box" user={this.props.friend} data={this.props.data} {...this.props}/>
			// 		<button className="button friends_delete_friend_button" type="button" onClick={() => this.deleteFriend(this.props.friend)}>Remove Friend</button>
			// 		</div>
			// 	</div>
			// 	<div className="my-pane">
			// 		<DiveLogBox className="friends_profile friend_divelog_box"  user={this.props.friend} data={this.props.data} {...this.props}/>
			// 	</div>
			// 	</SplitterLayout>
			// 	<div className="my-pane">
			// 		<FriendsBox className="friends_profile friend_friends_box"  user={this.props.friend} data={this.props.data} {...this.props}/>
			// 	</div>
			// </SplitterLayout>
    )
  }
}