import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import "bootstrap/dist/css/bootstrap.min.css"

class NavBar extends Component {

	render() {
		return (
			<nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
				<ul className="nav nav-pills">
					<li className="nav-item">
						<Link className="nav-link" to="/home">Home</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/divelog">Dive Log</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/friends">Dive Buddies</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" to="/divesites">Dive Sites</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

export default NavBar