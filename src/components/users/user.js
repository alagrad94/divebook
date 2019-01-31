import React, { Component } from 'react'

export default class User  extends Component {

	render() {


		return (
			<section className="dahsboard">
				{
					this.props.state.users.map(user =>
					<div key={user.id} className="card">
						<h5 className="card-title">{`User: `}{user.firstName} {user.lastName}</h5>
						<h5 className="card-subtitle mb-2 text-muted">Friends:</h5>
					</div>
				)}
			</section>
		)
	}
}