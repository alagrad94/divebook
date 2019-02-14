import React, { Component } from 'react'

export default class FriendsSearch extends Component {

	render() {
		return (
			<div>
				<form className="friend_search_form form-inline my-2  my-sm-0">
				<input
					className="friend_search_input form-control mr-sm-2"
					placeholder="Find New Friends"
					ref={input => this.search = input}
					onChange={this.props.handleFriendSearchInput}
				/>
				</form>
			</div>
		)
	}
}