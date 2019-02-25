import React, { Component } from 'react'
import FriendsListBox from './FriendsListBox/FriendsListBox'
import FriendsProfileBox from './FriendsProfileBox/FriendsProfileBox'
import styled from 'styled-components'
import { AppContainer as BaseAppContainer, ExampleNavigation as BaseNavigation, ExampleBody as BaseBody } from '../../containers';
import { SideNav } from 'react-sidenav'

//These constants are part of the sidenav component's requirements.
const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;

const Navigation = styled(BaseNavigation)`
  background: #861213;
  font-size: 1em;
  letter-spacing: 2px;
  width: 20%;
  line-height: 22px;
`;

const Body = styled(BaseBody)`
  height: calc(100vh - 40px);
`;

export default class Friends extends Component {

  render () {
    return(
      <React.Fragment>
         <AppContainer>
          <Navigation>
            <SideNav >
              <FriendsListBox className="friends_list_box" key={1} {...this.props} />
            </SideNav>
          </Navigation>
          <Body>
            <FriendsProfileBox className="friends_profile_box" deleteFriend={this.props.deleteFriend} {...this.props} />
          </Body>
        </AppContainer>
      </React.Fragment>
    )
  }
}
