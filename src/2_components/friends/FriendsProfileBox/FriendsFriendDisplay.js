import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import UserProfileBox from '../../dashboard/UserProfileBox/UserProfileBox'
import DiveLogBox from '../../dashboard/DiveLogBox/DiveLogBox'
import FriendsBox from '../../dashboard/FriendsBox/FriendsBox'
import { Box, Grid} from 'grommet'
import { Button } from 'react-bootstrap'

export default class FriendsFriendDisplay extends Component {

	//Because divebook has a true "friend" relationship and utilizes an intersect table to record them, two records are created for each friendship.  This handles deleting both of those records.
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
				columns={['30%', '70%']}
				rows={['70%', '30%']}
				gap='none'
			>
				<Box gridArea='profile' background='none' className="db_grid_left">
					<UserProfileBox className="profile prof_box" user={this.props.friend} data={this.props.data} />
					<Button type="button" className="button friends_delete_friend_button" onClick={() => this.deleteFriend(this.props.friend)}>Remove Friend</Button>
				</Box>
				<Box gridArea='divelog' background='none' className="db_grid_right">
					<DiveLogBox className="db_divelog divelog_box card-deck" user={this.props.friend} data={this.props.data} />
				</Box>
				<Box gridArea='friends' background='none' className="db_grid_bottom">
					<FriendsBox className="db_friends friends_box card-deck" user={this.props.friend} data={this.props.data} />
				</Box>
		</Grid>
    )
  }
}