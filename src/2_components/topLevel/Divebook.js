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
    this.builduserIdQueryString = this.builduserIdQueryString.bind(this);
		this.populateAppState = this.populateAppState.bind(this)
		this.setFirsts = this.setFirsts.bind(this)
		this.checkLogin = this.checkLogin.bind(this)
		this.showNav = this.showNav.bind(this)
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

        this.setState({friendSearchResults: filteredResults}, () => null)
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
		let allUsers = [];
		let diveSites = [];
		let currentUser = [];
		let diveLog = [];
		let friendsList = [];
		divebookData.handleData({dataSet: 'users', fetchType: 'GET', embedItem: ""})
		.then(users => {users.forEach(user => {allUsers.push(user)})
		this.setState({users: users}, ()=> null)})
		.then(() => {
			let userId = Number(sessionStorage.getItem("user"))
			this.state.users.forEach(record => {if(record.id === userId) {currentUser.push(record)}})
			this.setState({currentUser: currentUser}, ()=> null)})
		.then(() => divebookData.handleData({dataSet: "friends", fetchType: "GET", embedItem: ""}))
		.then(friends => {
			friends.filter(friend => friend.userId === Number(sessionStorage.getItem("user"))).forEach(connection => {
				let person = this.state.users.find(buddy => connection.friendId === buddy.id)
				friendsList.push(person)})
			friendsList.sort((a,b) => a.lastName.localeCompare(b.lastName))})
		.then(() => this.setState({friends: friendsList}, () => null))
		.then(() => divebookData.handleData({dataSet: 'diveLogEntries', fetchType: 'GET', embedItem: `?userId=${currentUser[0].id}&_expand=waterType&_expand=diveType&_expand=diveSite&_expand=airMix&_expand=precipType`}))
		.then(entries => {
			entries.forEach(entry => {diveLog.push(entry)});
			diveLog.sort((a,b) => new Date(b.diveDate) - new Date(a.diveDate))
			this.setState({diveLog: diveLog}, () => null)})
		.then(() => divebookData.handleData({dataSet: "diveSites", fetchType: "GET", embedItem: "?_expand=diveType&_expand=waterType"}))
    .then(sites => {
      sites.forEach(site => {diveSites.push(site)})
			diveSites.sort((a,b) => a.name.localeCompare(b.name))
      this.setState({diveSites: diveSites}, () => null)})
		.then(() => {
			let user = Number(sessionStorage.getItem("user"))
			divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `/${user}`})
    .then(user => {
      this.setState({photoUrl: user.userPhoto}, ()=>null)})})
		.then(() => this.setFirsts())
	}

	setFirsts () {

		let firstFriend = (this.state.friends.length > 0) ? this.state.friends[0].id : ""
		let firstDiveSite = (this.state.diveSites.length > 0) ? this.state.diveSites[0].id : ""
		let firstLogEntry = (this.state.diveLog.length > 0) ? this.state.diveLog[0].id : ""
		this.setState({firstFriend: firstFriend, firstDiveSite: firstDiveSite,firstLogEntry: firstLogEntry}, () => null)

	}

	checkLogin = (username, password) => {
    return divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `?userName=${username}&password=${password}`})
    }

	isAuthenticated = () => sessionStorage.getItem("user") !== null

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
				{/* <NavBar state={this.state} populateAppState={this.populateAppState}  handleFriendSearchInput={this.handleFriendSearchInput} showNav={this.showNav} {...this.props}/> */}
				<ApplicationViews state={this.state} populateAppState={this.populateAppState} handleFriendSearchInput={this.handleFriendSearchInput} checkLogin={this.checkLogin} isAuthenticated={this.isAuthenticated} {...this.props}/>
			</React.Fragment>
		)
	}
}