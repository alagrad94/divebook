import React, { Component } from 'react'
import NavBar from '../nav/NavBar'
import ApplicationViews from "../topLevel/ApplicationViews"
import divebookData from '../../1_modules/divebookData'


let userIdQueryString = "";
export default class Divebook extends Component {
	constructor(props) {
		super(props);

		this.state = {
			users: [],
			currentUser: [],
			friends: [],
			diveLog: [],
			diveSites: [],
			firstFriend: 0,
			firstDiveSite: 0,
			firstLogEntry: 0,
			photoUrl: "",
			friendSearchResults: [],
			jsonQuery: ""
		}

		this.handleFriendSearchInput = this.handleFriendSearchInput.bind(this);
		this.populateAppState = this.populateAppState.bind(this)
		this.checkLogin = this.checkLogin.bind(this)
		this.showNav = this.showNav.bind(this)
	}

	//This handles the input for the friend search.  This function and the necessary state elements reside at the top level of the appication because the input is in the NavBar component and the search results are down the Application Views component, thus the top level Divebook component is the common parent.

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

        this.setState({friendSearchResults: filteredResults}, () => null)
      })}
    })
	}

	//This function is used to set the initial state.  It is also passed down as props and called any time the database changes (adding, editing, deleting records).

	populateAppState () {
		let allUsers = [];
		let diveSites = [];
		let currentUser = [];
		let diveLog = [];
		let friendsList = [];
		let userId = Number(sessionStorage.getItem("user"))

		//Fetches all users and sets the array returned from the fetch into state as allUsers.
		return divebookData.handleData({dataSet: 'users', fetchType: 'GET', embedItem: ""})
			.then(users => users.forEach(user => {allUsers.push(user)}))
		.then(() => this.setState({users: allUsers}, ()=> null))

		//Iterates through all users and picks out the logged in user.  Sets that user record in state as currentUser.
		.then(() => this.state.users.forEach(record => {if(record.id === userId) {currentUser.push(record)}}))
		.then(() => this.setState({currentUser: currentUser}, ()=> null))

		//Fetches all records from the friends endpoint, filters it to the records where currentUser.id matches the userId field in the record.  It then builds an array of the user records for the friends identified in those records and sorts the final list of friends alphabetically. Finally it sets that array into state as friends.
		.then(() => {return divebookData.handleData({dataSet: "friends", fetchType: "GET", embedItem: ""})
			.then(friends => {
				friends.filter(friend => friend.userId === userId).forEach(connection => {
					let person = this.state.users.find(buddy => connection.friendId === buddy.id)
					friendsList.push(person)})
				friendsList.sort((a,b) => a.lastName.localeCompare(b.lastName))})})
		.then(() => this.setState({friends: friendsList}, () => null))

		//Retrieves all records from the divelog enpoint for the logged in user.  It then puts them into an array and sorts it by date/time and then sets the array into state as diveLog.
		.then(() => {return divebookData.handleData({dataSet: 'diveLogEntries', fetchType: 'GET', embedItem: `?userId=${userId}&_expand=waterType&_expand=diveType&_expand=diveSite&_expand=airMix&_expand=precipType`})
			.then(entries => {
				entries.forEach(entry => {diveLog.push(entry)});
				diveLog.sort((a,b) => new Date(`${b.diveDate}T${b.diveStartTime}`) - new Date(`${a.diveDate}T${a.diveStartTime}`))})})
		.then(() =>	this.setState({diveLog: diveLog}, () => null))

		//Retrieves all records from the divesites endpoint, places them into an array, sorts them alphabetically and sets the array into state as diveSites.
		.then(() => {return divebookData.handleData({dataSet: "diveSites", fetchType: "GET", embedItem: "?_expand=diveType&_expand=waterType"})
    	.then(sites => {
				sites.forEach(site => {diveSites.push(site)})
				diveSites.sort((a,b) => a.name.localeCompare(b.name))})})
		.then(() =>  this.setState({diveSites: diveSites}, () => null))

		//Gets the photoUrl from the currently logged in users' database record and sets it into state as photoUrl.  This is used for displaying the profile photo.
		.then(() => {divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `?id=${userId}`})
			.then(users => {users.forEach(user => this.setState({photoUrl: user.userPhoto}, ()=> null))})})

		//Sets the first record of friends, diveSites and diveLog into a state variable.  This is done so that in the NavBar the link can always navigate to the top of the sorted arrays, thus displaying the correct.  It also allows Application Views to diplay the correct record after an edit, delete or addition, which all cause a resorting of the arrays.
		.then(() => {
			let firstFriend = (this.state.friends.length > 0) ? this.state.friends[0].id : ""
			let firstDiveSite = (this.state.diveSites.length > 0) ? this.state.diveSites[0].id : ""
			let firstLogEntry = (this.state.diveLog.length > 0) ? this.state.diveLog[0].id : ""

			this.setState({firstFriend: firstFriend, firstDiveSite: firstDiveSite,firstLogEntry: firstLogEntry}, () => null)
		})
	}

	//Checks users enpoint to ensure the username and password combo exists.
	checkLogin = (username, password) => {
    return divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `?userName=${username}&password=${password}`})
    }

	isAuthenticated = () => sessionStorage.getItem("user") !== null

	//Keeps NavBar from showing on the login page.
	showNav = () => {
		if (this.isAuthenticated()) {
			return <NavBar state={this.state} populateAppState={this.populateAppState}  handleFriendSearchInput={this.handleFriendSearchInput} showNav={this.showNav} {...this.props}/>
		}
	}

	componentDidMount(){
		if(this.isAuthenticated()){
		this.populateAppState();}

	}

	render() {
		return (
			<React.Fragment>
				{this.showNav()}
				<ApplicationViews state={this.state} populateAppState={this.populateAppState} handleFriendSearchInput={this.handleFriendSearchInput} checkLogin={this.checkLogin} isAuthenticated={this.isAuthenticated} {...this.props}/>
			</React.Fragment>
		)
	}
}