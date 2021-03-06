import { Route, withRouter, Redirect } from 'react-router-dom'
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
import Login from './Login';
import Register from './Register';
import PhotoAlbums from '../photos/photoAlbums/PhotoAlbums'


class ApplicationViews extends Component {
	state = {
		logIdForPictureReroute: ""
	}

	//All of these functions are called from within other components.  The downstream component builds the necessary elements to PUT/POST/PATCH and passes them to these functions.  These then do the database operation, rebuild state and route to the correct new record based on the resorted array in state.

	editLogEntry = entry => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "PUT", putId: entry.id, dataBaseObject: entry}).then(() => this.props.populateAppState()).then(() => this.props.history.push(`/divelog/${this.props.state.firstLogEntry}`))

	addLogEntry = entry => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "POST", dataBaseObject: entry}).then(() => this.props.populateAppState()).then(() => this.props.history.push(`/divelog/${this.props.state.firstLogEntry}`))

	//This function is slightly different. It sets the logId of the diveLog entry to which photos were just added and then routes to a generic path.  Below in the App Views route, the generic path then routes to the specific record.  This was necessary after the photo upload because simply navigating directly to the record with history.push didn't refresh the page and a refresh is required to get the photos to display.  The database ooly contains a URL for the photo, so while the URLs would be in teh diveLog record in state, they wouldn't show without the page refresh.

	addPhotos = (id, url) => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "PATCH", patchId: id, dataBaseObject: {"id": id ,"coverPhoto": url}}).then(()=> this.setState({logIdForPictureReroute: id}, ()=> null)).then(()=> this.props.populateAppState()).then(() => this.props.history.push("/divelog"))

	deleteLogEntry = id => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "DELETE", deleteId: id}).then(() => this.props.populateAppState()).then(() => this.props.history.push(`/divelog/${this.props.state.firstLogEntry}`))

	editDiveSite = site => divebookData.handleData({dataSet: "diveSites", fetchType: "PUT", putId: site.id, dataBaseObject: site}).then(() => this.props.populateAppState()).then(() => this.props.history.push(`/divesites/${this.props.state.firstDiveSite}`))

	addDiveSite = site => divebookData.handleData({dataSet: "diveSites", fetchType: "POST", dataBaseObject: site}).then(() => this.props.populateAppState()).then(() => this.props.history.push(`/divesites/${this.props.state.firstDiveSite}`))

	addFriend = (dataBaseObject) => divebookData.handleData({dataSet: "friends", fetchType: "POST", dataBaseObject: dataBaseObject}).then(() => this.props.populateAppState()).then(() => this.props.history.push(`/friends/${this.props.state.firstFriend}`))

	deleteFriend = (id) => divebookData.handleData({dataSet: "friends", fetchType: "DELETE", deleteId: id}).then(() => this.props.populateAppState()).then(() => this.props.history.push(`/friends/${this.props.state.firstFriend}`))

	editUserProfile = user => divebookData.handleData({dataSet: "users", fetchType: "PUT", putId: user.id, dataBaseObject: user}).then(() => this.props.populateAppState()).then(() => this.props.history.push("/profile"))

	registerNewUser = user => divebookData.handleData({dataSet: "users", fetchType: "POST", dataBaseObject: user}).then(() => this.props.populateAppState()).then(() => this.props.history.push("/home"))

	render() {

		return (
			<React.Fragment>

				<Route exact path="/" render={(props) => {
					return <Login {...props} populateAppState={this.props.populateAppState} checkLogin={this.props.checkLogin}/>}} />

				<Route exact path="/register" render={(props) => {
					return <Register {...props} registerNewUser={this.registerNewUser} populateAppState={this.props.populateAppState}/>}} />

				<Route exact path="/home" render={(props) => {
					if(this.props.isAuthenticated()) {
						return <DivebookDashboard {...props} user={Number(sessionStorage.getItem("user"))} data={this.props.state} populateAppState={this.props.populateAppState}/>
					} else {
						return <Redirect to='/' />
    			}}} />

				<Route exact path="/divelog/:id" render={(props) => {
					if(this.props.isAuthenticated()) {
						return <DiveLog {...props} data={this.props.state} populateAppState={this.props.populateAppState} deleteLogEntry={this.deleteLogEntry} addPhotos={this.addPhotos}/>
					} else {
						return <Redirect to='/' />
    			}}} />
				<Route exact path="/divelogentry/new" render={props => {
    			return <DiveLogEntryEditForm {...props} populateAppState={this.props.populateAppState} addLogEntry={this.addLogEntry} editLogEntry={this.editLogEntry}/> }}/>
				<Route exact path="/divelog/:id/edit" render={(props)=> {
    			return <DiveLogEntryEditForm {...props} populateAppState={this.props.populateAppState} addLogEntry={this.addLogEntry} editLogEntry={this.editLogEntry}/>}} />

				{/*This route is used to cause the page refresh when photos are added to a diveLog entry.*/}
				<Route exact path="/divelog" render={(props)=> {
    			return <Redirect to={`/divelog/${this.state.logIdForPictureReroute}`} />
					}} />

				<Route exact path="/photos/:id" render={(props) => {
					if(this.props.isAuthenticated()) {
						return <PhotoAlbums {...props} data={this.props.state} />
					} else {
						return <Redirect to='/' />
    			}}} />

				<Route exact path="/divesites/:id" render={(props) => {
					if(this.props.isAuthenticated()) {
						return <DiveSites {...props} data={this.props.state} populateAppState={this.props.populateAppState}/>
					} else {
						return <Redirect to='/' />
					}}} />
				<Route exact path="/divesitesentry/new" render={props => {
    			return <DiveSiteEntryEditForm {...props} populateAppState={this.props.populateAppState} addDiveSite={this.addDiveSite} editDiveSite={this.editDiveSite}/> }}/>
				<Route exact path="/divesites/:id/edit" render={props => {
					return <DiveSiteEntryEditForm {...props} populateAppState={this.props.populateAppState} addDiveSite={this.addDiveSite} editDiveSite={this.editDiveSite}/> }}/>

				<Route exact path="/friends/:id" render={(props) => {
					if(this.props.isAuthenticated()) {
						return <Friends {...props} data={this.props.state} populateAppState={this.props.populateAppState} addFriend={this.addFriend} deleteFriend={this.deleteFriend}/>
					}	else {
						return <Redirect to='/' />
    			}}} />
				<Route exact path="/searchresults" render={(props) => {
					return <FriendsSearchResults {...props} data={this.props.state} jsonQuery={this.props.state.jsonQuery} handleFriendSearchInput={this.props.handleFriendSearchInput} friendSearchResults={this.props.state.friendSearchResults} addFriend={this.addFriend} deleteFriend={this.deleteFriend} />}} />

				<Route exact path="/profile" render={(props) => {
					if(this.props.isAuthenticated()) {
						return <UserProfile {...props} data={this.props.state} editUserProfile={this.editUserProfile} />
					}	else {
						return <Redirect to='/' />
    			}}} />
				<Route exact path="/profile/edit" render={props => {
					return <ProfileAddEditForm {...props} data={this.props.state} populateAppState={this.props.populateAppState} editUserProfile={this.editUserProfile} registerNewUser={this.registerNewUser}/> }}/>

			</React.Fragment>
		)
	}
}

export default withRouter(ApplicationViews)