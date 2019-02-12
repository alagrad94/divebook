import React, { Component } from 'react';
import DiveLogBox from './DiveLogBox/DiveLogBox';
import FriendsBox from './FriendsBox/FriendsBox';
import UserProfileBox from './UserProfileBox/UserProfileBox';
import SplitterLayout from 'react-splitter-layout'

export default class DivebookDashboard  extends Component {

	render() {

		return (
			<SplitterLayout vertical percentage={true} secondaryInitialSize={30} >
				<SplitterLayout percentage={true} secondaryInitialSize={70}>
				<div className="my-pane">
					<UserProfileBox className="profile prof_box" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</div>
				<div className="my-pane">
					<DiveLogBox className="db_divelog divelog_box card-deck" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</div>
				</SplitterLayout>
				<div className="my-pane" >
					<FriendsBox className="db_friends friends_box card-deck" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</div>
			</SplitterLayout>
		)
	}
}
