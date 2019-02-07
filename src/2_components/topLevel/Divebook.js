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
			diveSites: [],
			firstFriend: 0,
			firstDiveSite: 0,
			firstLogEntry: 0,
			friendSearchResults: [],
			jsonQuery: ""
		}

		this.handleFriendSearchInput = this.handleFriendSearchInput.bind(this);
    this.builduserIdQueryString = this.builduserIdQueryString.bind(this);
		this.populateAppState = this.populateAppState.bind(this)
		this.setFirsts = this.setFirsts.bind(this)
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

		let diveSites = []
		let friends = []
		let currentUser = []
		let diveLog = [];
		divebookData.handleData({dataSet: 'users', fetchType: 'GET', embedItem: ""})
		.then(users => {this.setState({users: users}, ()=> null)})
		.then(() => {
			let user = this.state.users.find(user => user.id = Number(sessionStorage.getItem("user")))
			currentUser.push(user)
			this.setState({currentUser: currentUser}, ()=> null)
			user.friends.map(buddy =>
				this.state.users.filter(user => user.id === buddy).map(friend =>
					friends.push(friend)))
			friends.sort((a,b) => a.lastName.localeCompare(b.lastName))
			this.setState({friends: friends}, () => null)
		})
		.then(() => divebookData.handleData({dataSet: 'diveLogEntries', fetchType: 'GET', embedItem: `?userId=${currentUser[0].id}&_expand=waterType&_expand=diveType&_expand=diveSite&_expand=airMix&_expand=precipType`}))
		.then(entries => {
			entries.forEach(entry => {
				diveLog.push(entry)});
			diveLog.sort((a,b) => new Date(b.diveDate) - new Date(a.diveDate))
			this.setState({diveLog: diveLog}, () => null)
		})
		.then(() => divebookData.handleData({dataSet: "diveSites", fetchType: "GET", embedItem: "?_expand=diveType&_expand=waterType"}))
    .then(sites => {
      sites.forEach(site => {
				diveSites.push(site)})
			diveSites.sort((a,b) => a.name.localeCompare(b.name))
      this.setState({diveSites: diveSites}, () => null)
		})
		.then(() => this.setFirsts())
	}

	setFirsts () {
		let firstFriend = this.state.friends[0].id;
		let firstDiveSite = this.state.diveSites[0].id;
		let firstLogEntry = this.state.diveLog[0].id;
		this.setState({firstFriend: firstFriend, firstDiveSite: firstDiveSite,firstLogEntry: firstLogEntry}, () => null)

	}

	componentDidMount(){

		sessionStorage.setItem("user", "1");
		this.populateAppState();

	}

	render() {
		return (
			<React.Fragment>
				<NavBar state={this.state} populateAppState={this.populateAppState}  handleFriendSearchInput={this.handleFriendSearchInput} {...this.props}/>
				<ApplicationViews state={this.state} populateAppState={this.populateAppState} handleFriendSearchInput={this.handleFriendSearchInput} {...this.props}/>
			</React.Fragment>
		)
	}
}