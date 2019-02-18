import React, { Component } from "react"
import { Link } from "react-router-dom"
import FriendsSearch from './FriendSearch'

class NavBar extends Component {

	render() {
		//Uses the "first" variables in state to navigate to ensure navigation is always to the top record in the list.
		let firstFriendPath = `/friends/${this.props.state.firstFriend}`;
		let firstDiveSitePath = `/divesites/${this.props.state.firstDiveSite}`;
		let firstLogEntryPath = `/divelog/${this.props.state.firstLogEntry}`;
		let firstPhotoAlbumPath = `/photos/${this.props.state.firstLogEntry}`;
		return (
			<nav className="navbar p-2">
				<a className="navbar-brand" href="/home">Divebook</a>
				<ul className="nav nav-pills">
					<li className="nav-item-fix">
						<Link className="nav-link" to="/home">Home</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={firstLogEntryPath} >Dive Log</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={firstPhotoAlbumPath	} >Photo Albums</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={firstFriendPath} >Dive Buddies</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to={firstDiveSitePath} >Dive Sites</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/profile" >Profile</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/">Logout</Link>
					</li>
					<Link to="/searchresults"><FriendsSearch jsonQuery={this.props.state.jsonQuery} handleFriendSearchInput={this.props.handleFriendSearchInput} friendSearchResults={this.props.state.friendSearchResults} addFriend={this.props.addFriend} deleteFriend={this.props.deleteFriend}/></Link>
				</ul>
			</nav>
		)
	}
}

export default NavBar