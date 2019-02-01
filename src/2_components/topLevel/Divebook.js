import React, { Component } from 'react'
import NavBar from '../nav/NavBar'
import ApplicationViews from "../topLevel/ApplicationViews"
import divebookData from '../../1_modules/divebookData'

export default class Divebook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			currentUser: [],
			friends: []
		}

		this.populateAppState = this.populateAppState.bind(this)
	}

	populateAppState () {

		let friends = []
		let currentUser = []
		divebookData.handleData({dataSet: 'users', fetchType: 'GET', embedItem: ""})
		.then(users => {this.setState({users: users}, ()=> console.log("Hi"))})
		.then(() => {
			let user = this.state.users.find(user => user.id = Number(sessionStorage.getItem("user")))
			currentUser.push(user)
			this.setState({currentUser: currentUser}, () => ()=> console.log("Hi"))
			user.friends.map(buddy =>
				this.state.users.filter(user => user.id === buddy).map(friend =>
					friends.push(friend)))
			this.setState({friends: friends}, () => console.log(this.state.friends))
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
				<ApplicationViews state={this.state}/>
			</React.Fragment>
		)
	}
}