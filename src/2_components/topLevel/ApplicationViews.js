import { Route, withRouter } from 'react-router-dom'
import React, { Component } from "react"
import DivebookDashboard from '../dashboard/Dashboard'
import DiveLog from '../divelog/Divelog'
import Friends from '../friends/Friends'
import DiveSites from '../divesites/DiveSites'
import DiveLogEntryEditForm from '../divelog/DiveLogEntryEditForm/DiveLogEntryEditForm';
import DiveSiteEntryEditForm from '../divesites/DiveSitesEntryEditForm/DiveSitesEntryEditForm';
import divebookData from '../../1_modules/divebookData';
import FriendsSearchResults from '../friends/FriendsSearchResults'
import ProfileAddEditForm from '../profile/ProfileAddEditForm'
import UserProfile from '../profile/UserProfile';

class ApplicationViews extends Component {

	editLogEntry = entry => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "PUT", putId: entry.id, dataBaseObject: entry}).then(this.props.populateAppState()).then(() => this.props.history.push(`/divelog/${this.props.state.firstLogEntry}`))

	addLogEntry = entry => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "POST", dataBaseObject: entry}).then(this.props.populateAppState()).then(() => this.props.history.push(`/divelog/${this.props.state.firstLogEntry}`))

	deleteLogEntry = id => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "DELETE", deleteId: id}).then(this.props.populateAppState()).then(() => this.props.history.push(`/divelog/${this.props.state.firstLogEntry}`))

	editDiveSite = site => divebookData.handleData({dataSet: "diveSites", fetchType: "PUT", putId: site.id, dataBaseObject: site}).then(this.props.populateAppState()).then(() => this.props.history.push(`/divesites/${this.props.state.firstDiveSite}`))

	addDiveSite = site => divebookData.handleData({dataSet: "diveSites", fetchType: "POST", dataBaseObject: site}).then(this.props.populateAppState()).then(() => this.props.history.push(`/divesites/${this.props.state.firstDiveSite}`))

	addFriend = (dataBaseObject) => divebookData.handleData({dataSet: "friends", fetchType: "POST", dataBaseObject: dataBaseObject}).then(this.props.populateAppState()).then(() => this.props.history.push(`/friends/${this.props.state.firstFriend}`))

	deleteFriend = (id) => divebookData.handleData({dataSet: "friends", fetchType: "DELETE", deleteId: id}).then(this.props.populateAppState()).then(() => this.props.history.push(`/friends/${this.props.state.firstFriend}`))

	editUserProfile = user => divebookData.handleData({dataSet: "users", fetchType: "PUT", putId: user.id, dataBaseObject: user}).then(this.props.populateAppState()).then(() => this.props.history.push("/profile"))

	registerNewUser = user => divebookData.handleData({dataSet: "users", fetchType: "POST", dataBaseObject: user}).then(this.props.populateAppState()).then(() => this.props.history.push("/profile"))

	render() {

		return (
			<React.Fragment>

				<Route exact path="/" render={(props) => {
					return <DivebookDashboard {...props} data={this.props.state} populateAppState={this.props.populateAppState}/>}} />

				<Route exact path="/divelog/:id" render={(props) => {
					return <DiveLog {...props} data={this.props.state} populateAppState={this.props.populateAppState} deleteLogEntry={this.deleteLogEntry}/>}} />
				<Route exact path="/divelogentry/new" render={props => {
    			return <DiveLogEntryEditForm {...props} populateAppState={this.props.populateAppState} addLogEntry={this.addLogEntry} editLogEntry={this.editLogEntry}/> }}/>
				<Route exact path="/divelog/:id/edit" render={(props)=> {
    			return <DiveLogEntryEditForm {...props} populateAppState={this.props.populateAppState} addLogEntry={this.addLogEntry} editLogEntry={this.editLogEntry}/>}} />

				<Route exact path="/divesites/:id" render={(props) => {
					return <DiveSites {...props} data={this.props.state} populateAppState={this.props.populateAppState}/>}} />
				<Route exact path="/divesitesentry/new" render={props => {
    			return <DiveSiteEntryEditForm {...props} populateAppState={this.props.populateAppState} addDiveSite={this.addDiveSite} editDiveSite={this.editDiveSite}/> }}/>
				<Route exact path="/divesites/:id/edit" render={props => {
					return <DiveSiteEntryEditForm {...props} populateAppState={this.props.populateAppState} addDiveSite={this.addDiveSite} editDiveSite={this.editDiveSite}/> }}/>

				<Route exact path="/friends/:id" render={(props) => {
					return <Friends {...props} data={this.props.state} populateAppState={this.props.populateAppState} addFriend={this.addFriend} deleteFriend={this.deleteFriend}/>}} />
				<Route exact path="/searchresults" render={(props) => {
					return <FriendsSearchResults {...props} data={this.props.state} jsonQuery={this.props.state.jsonQuery} handleFriendSearchInput={this.props.handleFriendSearchInput} friendSearchResults={this.props.state.friendSearchResults} addFriend={this.addFriend} deleteFriend={this.deleteFriend} />}} />

				<Route exact path="/profile" render={(props) => {
					return <UserProfile {...props} data={this.props.state} editUserProfile={this.editUserProfile} />}} />
				<Route exact path="/profile/edit" render={props => {
					return <ProfileAddEditForm {...props} data={this.props.state} populateAppState={this.props.populateAppState} editUserProfile={this.editUserProfile} registerNewUser={this.registerNewUser}/> }}/>

			</React.Fragment>
		)
	}
}

export default withRouter(ApplicationViews)