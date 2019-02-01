import React, { Component } from 'react'

export default class Dashboard  extends Component {

	render() {
		let currentUser = 1;
		return (
			<section className="dahsboard">
				{
					this.props.state.users.map(user =>
					<div key={user.id} className="card">
						<h5 className="card-title">{`User: `}{user.firstName} {user.lastName}</h5>
						<h5 className="card-subtitle mb-2 text-muted">Friends:</h5>
							{
							user.friends.map(buddy =>
								this.props.state.users.filter(user => user.id === buddy).map(friend =>
									<div key={friend.id} className="friend">
										{friend.firstName} {friend.lastName}
									</div>
								)
							)}
					</div>
				)}
			</section>
		)
	}
}