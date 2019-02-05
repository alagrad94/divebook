import React, { Component } from 'react'
import NavBar from '../nav/NavBar'
import ApplicationViews from "../topLevel/ApplicationViews"
import divebookData from '../../1_modules/divebookData'

import "bootstrap/dist/css/bootstrap.min.css"


export default class Divebook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			currentUser: [],
			friends: [],
			diveLog: [],

		}

		this.populateAppState = this.populateAppState.bind(this)
	}

	populateAppState () {

		let friends = []
		let currentUser = []
		let diveLog = [];
		divebookData.handleData({dataSet: 'users', fetchType: 'GET', embedItem: ""})
		.then(users => {this.setState({users: users}, ()=> console.log("Hi"))})
		.then(() => {
			let user = this.state.users.find(user => user.id = Number(sessionStorage.getItem("user")))
			currentUser.push(user)
			this.setState({currentUser: currentUser}, ()=> console.log(this.state.currentUser))
			user.friends.map(buddy =>
				this.state.users.filter(user => user.id === buddy).map(friend =>
					friends.push(friend)))
			this.setState({friends: friends}, () => console.log(this.state.friends))
		})
		.then(() => divebookData.handleData({dataSet: 'diveLogEntries', fetchType: 'GET', embedItem: `?userId=${currentUser[0].id}&_expand=waterType&_expand=diveType&_expand=diveSite&_expand=airMix&_expand=precipType`}))
		.then(entries => {
			entries.forEach(entry => {
				diveLog.push(entry)
			});
			this.setState({diveLog: diveLog}, () => console.log(this.state.diveLog))
		})

	}

	componentDidMount(){

		sessionStorage.setItem("user", "1");
		this.populateAppState();

	}

	render() {
		return (
			<React.Fragment>
				<NavBar state={this.state}/>
				<ApplicationViews state={this.state} populateAppState={this.populateAppState}/>
			</React.Fragment>
		)
	}
}