import React, { Component } from 'react';
import DiveLogBox from './DiveLogBox/DiveLogBox';
import FriendsBox from './FriendsBox/FriendsBox';
import UserProfileBox from './UserProfileBox/UserProfileBox';
import { Box, Grid} from 'grommet'

export default class DivebookDashboard  extends Component {

	componentDidMount(){
		this.props.populateAppState();
	}

	render() {

		return (

			<Grid className="db_grid"
				areas ={[
					{name: 'profile', start: [0,0], end: [1,1]},
					{name: 'divelog', start: [1,0], end: [2,1]},
					{name: 'friends', start: [0,1], end: [2,1]}
				]}
				columns={['30%', '70%', '10px']}
				rows={['75%', '25%']}
				gap='none'
			>
				<Box gridArea='profile' background='none' className="db_grid_left">
					<UserProfileBox className="profile prof_box" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</Box>

				<Box gridArea='divelog' background='none' className="db_grid_right">
					<DiveLogBox className="db_divelog divelog_box card-deck" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</Box>

				<Box gridArea='friends' background='none' className="db_grid_bottom">
					<FriendsBox className="db_friends friends_box card-deck" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
				</Box>
			</Grid>

			// <SplitterLayout className="dashboard" vertical percentage={true} secondaryInitialSize={30} >
			// 	<SplitterLayout percentage={true} secondaryInitialSize={70}>
			// 	<div className="my-pane">
			// 		<UserProfileBox className="profile prof_box" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
			// 	</div>
			// 	<div className="my-pane">
			// 		<DiveLogBox className="db_divelog divelog_box card-deck" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
			// 	</div>
			// 	</SplitterLayout>
			// 	<div className="my-pane" >
			// 		<FriendsBox className="db_friends friends_box card-deck" user={Number(sessionStorage.getItem("user"))} data={this.props.data} />
			// 	</div>
			// </SplitterLayout>
		)
	}
}
