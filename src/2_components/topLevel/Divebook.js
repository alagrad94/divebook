import React, { Component } from 'react'
import NavBar from '../nav/NavBar'
import ApplicationViews from "../topLevel/ApplicationViews"
import divebookData from '../../1_modules/divebookData'

import "bootstrap/dist/css/bootstrap.min.css"

let userIdQueryString = "";
export default class Divebook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			currentUser: [],
			friends: [],
			diveLog: [],
			friendSearchResults: [],
			jsonQuery: ""
		}

		this.handleFriendSearchInput = this.handleFriendSearchInput.bind(this);
    this.builduserIdQueryString = this.builduserIdQueryString.bind(this);
		this.populateAppState = this.populateAppState.bind(this)
	}
	handleFriendSearchInput = (e) => {
    this.setState({
      jsonQuery: e.target.value

    }, () => {
    if (this.state.jsonQuery && this.state.jsonQuery.length >1) {
      let filteredResults = [];
      divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem:`?q=${this.state.jsonQuery}`}).then(results => {
        results.forEach(result => {

          if ((this.state.friends.map(friend => friend.id).includes(result.id)) === false) {

            filteredResults.push(result)
          }});

        this.setState({friendSearchResults: filteredResults})
      })}
    })
	}

	builduserIdQueryString () {
    let currentUserId = Number(sessionStorage.getItem("User"));
    console.log(currentUserId)
    userIdQueryString = "";
    userIdQueryString += `userId=${currentUserId}`
    this.state.friends.forEach(friend => {
      let friendId = friend.id;
      userIdQueryString += `&&userId=${friendId}`
    })
    console.log(userIdQueryString)
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

	addFriend = (id, dataBaseObject) => divebookData.handleData({dataSet: "users", fetchType: "PUT", putId: id, dataBaseObject: dataBaseObject}).then(this.populateAppState())

  deleteFriend = (id, dataBaseObject) => divebookData.handleData({dataSet: "users", fetchType: "PUT", putId: id, dataBaseObject: dataBaseObject}).then(this.populateAppState())

	componentDidMount(){

		sessionStorage.setItem("user", "1");
		this.populateAppState();

	}

	render() {
		return (
			<React.Fragment>
				<NavBar state={this.state} populateAppState={this.populateAppState} jsonQuery={this.state.jsonQuery} handleFriendSearchInput={this.handleFriendSearchInput} addFriend={this.addFriend} deleteFriend={this.deleteFriend}/>
				<ApplicationViews state={this.state} populateAppState={this.populateAppState} jsonQuery={this.state.jsonQuery} handleFriendSearchInput={this.handleFriendSearchInput} addFriend={this.addFriend} deleteFriend={this.deleteFriend}/>
			</React.Fragment>
		)
	}
}