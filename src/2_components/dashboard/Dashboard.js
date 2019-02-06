import React, { Component } from 'react';
import DiveLogBox from './DiveLogBox/DiveLogBox';
import FriendsBox from './FriendsBox/FriendsBox';
import UserProfileBox from './UserProfileBox/UserProfileBox';
import SplitterLayout from 'react-splitter-layout'
import './dashboard.css'

export default class DivebookDashboard  extends Component {

	render() {

		return (
			<SplitterLayout vertical percentage={true} secondaryInitialSize={30}>
				<SplitterLayout percentage={true} secondaryInitialSize={50}>
				<div className="my-pane">
					<UserProfileBox user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</div>
				<div className="my-pane">
					<DiveLogBox user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</div>
				</SplitterLayout>
				<div className="my-pane">
					<FriendsBox user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</div>
			</SplitterLayout>
		)
	}
}
