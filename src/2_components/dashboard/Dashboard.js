import React, { Component } from 'react';
import DiveLogBox from './DiveLogBox/DiveLogBox';
import FriendsBox from './FriendsBox/FriendsBox';
import UserProfileBox from './UserProfileBox/UserProfileBox';
import './dashboard.css'

export default class Dashboard  extends Component {

	render() {

		return (
			<section className="dahsboard">
					<UserProfileBox  user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
					<DiveLogBox user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
					<FriendsBox className="friendsBox" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
			</section>
		)
	}
}