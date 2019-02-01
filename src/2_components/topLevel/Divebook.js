import React, { Component } from 'react'
import NavBar from '../components/nav/NavBar'
import ApplicationViews from "../topLevel/ApplicationViews"
import divebookData from '../../1_modules/divebookData'

export default class Divebook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: []
		}

		this.populateAppState = this.populateAppState.bind(this)
	}

	populateAppState () {
		divebookData.handleData({dataSet: 'users', fetchType: 'GET', embedItem: ""})
		.then(users => {this.setState({users: users})})
		}

	componentDidMount(){
		sessionStorage.setItem("user", "1");
		this.populateAppState();

	}

	render() {
		return (
			<React.Fragment>
				<NavBar state={this.state}/>
				<ApplicationViews state={this.state}/>
			</React.Fragment>
		)
	}
}