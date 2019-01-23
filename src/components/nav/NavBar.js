import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-light light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar