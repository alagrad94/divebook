import { Route } from 'react-router-dom'
import React, { Component } from "react"
import Dashboard from '../dashboard/Dashboard'
import DiveLog from '../divelog/Divelog'
import Friends from '../friends/Friends'
import DiveSites from '../divesites/DiveSites'
import DiveLogEntryEditForm from '../divelog/DiveLogEntryEditForm/DiveLogEntryEditForm';
import DiveSiteEntryEditForm from '../divesites/DiveSitesEntryEditForm/DiveSitesEntryEditForm';
import divebookData from '../../1_modules/divebookData';
import FriendsSearchResults from '../friends/FriendsSearchResults'


export default class ApplicationViews extends Component {

	editLogEntry = entry => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "PUT", putId: entry.id, dataBaseObject: entry}).then(this.props.populateAppState())

	addLogEntry = entry => divebookData.handleData({dataSet: "diveLogEntries", fetchType: "POST", dataBaseObject: entry}).then(this.props.populateAppState())

	editDiveSite = site => divebookData.handleData({dataSet: "diveSites", fetchType: "PUT", putId: site.id, dataBaseObject: site}).then(this.props.populateAppState())

	addDiveSite = site => divebookData.handleData({dataSet: "diveSites", fetchType: "POST", dataBaseObject: site}).then(this.props.populateAppState())

	addFriend = (id, dataBaseObject) => divebookData.handleData({dataSet: "users", fetchType: "PUT", putId: id, dataBaseObject: dataBaseObject}).then(this.props.populateAppState())

  deleteFriend = (id, dataBaseObject) => divebookData.handleData({dataSet: "users", fetchType: "PUT", putId: id, dataBaseObject: dataBaseObject}).then(this.props.populateAppState())

	render() {
		return (
			<React.Fragment>

				<Route exact path="/home" render={(props) => {
					return <Dashboard {...props} data={this.props.state} populateAppState={this.props.populateAppState}/>}} />

				<Route exact path="/divelog/:id" render={(props) => {
					return <DiveLog {...props} data={this.props.state} populateAppState={this.props.populateAppState} />}} />
				<Route exact path="/divelogentry/new" render={props => {
    			return <DiveLogEntryEditForm {...props} populateAppState={this.props.populateAppState} addLogEntry={this.addLogEntry} editLogEntry={this.editLogEntry}/> }}/>
				<Route exact path="/divelog/:id/edit" render={(props)=> {
    			return <DiveLogEntryEditForm {...props} populateAppState={this.props.populateAppState} addLogEntry={this.addLogEntry} editLogEntry={this.editLogEntry}/>}} />

				<Route exact path="/divesites" render={(props) => {
					return <DiveSites {...props} data={this.props.state} populateAppState={this.props.populateAppState}/>}} />
				<Route exact path="/divesites/new" render={props => {
    			return <DiveSiteEntryEditForm {...props} populateAppState={this.props.populateAppState} addDiveSite={this.addDiveSite} editDiveSite={this.editDiveSite}/> }}/>
				<Route exact path="/divesites/:id/edit" render={props => {
					return <DiveSiteEntryEditForm {...props} populateAppState={this.props.populateAppState} addDiveSite={this.addDiveSite} editDiveSite={this.editDiveSite}/> }}/>

				<Route exact path="/friends/:id" render={(props) => {
					return <Friends {...props} data={this.props.state} populateAppState={this.props.populateAppState} addFriend={this.addFriend} deleteFriend={this.deleteFriend}/>}} />
				<Route exact path="/searchresults" render={(props) => {
					return <FriendsSearchResults {...props} jsonQuery={this.props.state.jsonQuery} handleFriendSearchInput={this.props.handleFriendSearchInput} friendSearchResults={this.props.state.friendSearchResults} addFriend={this.addFriend} deleteFriend={this.deleteFriend}/>}} />

			</React.Fragment>
		)
	}
}