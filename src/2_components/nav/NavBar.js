import React, { Component } from "react"
import { Link } from "react-router-dom"
import FriendsSearch from './FriendSearch'
import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {

	render() {
		let firstFriendPath = `/friends/${this.props.state.firstFriend}`;
		// let firstDiveSitePath = `/divesites/${this.props.state.firstDiveSite}`;
		let firstLogEntryPath = `/divelog/${this.props.state.firstLogEntry}`;
		return (
			<nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
				<ul className="nav nav-pills">
					<li className="nav-item">
						<Link className="nav-link" to="/home">Home</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={firstLogEntryPath} >Dive Log</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={firstFriendPath} >Dive Buddies</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/divesites">Dive Sites</Link>
					</li>
					<Link to="/searchresults"><FriendsSearch jsonQuery={this.props.state.jsonQuery} handleFriendSearchInput={this.props.handleFriendSearchInput} friendSearchResults={this.props.state.friendSearchResults} addFriend={this.props.addFriend} deleteFriend={this.props.deleteFriend}/></Link>
				</ul>
			</nav>
		)
	}
}

export default NavBar