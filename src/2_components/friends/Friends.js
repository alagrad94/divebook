import React, { Component } from 'react'
import FriendsListBox from './FriendsListBox/FriendsListBox'
import FriendsProfileBox from './FriendsProfileBox/FriendsProfileBox'
import styled from 'styled-components'
import { AppContainer as BaseAppContainer, ExampleNavigation as BaseNavigation } from '../../containers';
import { SideNav } from 'react-sidenav'
import './friends.css'

const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;

const Navigation = styled(BaseNavigation)`
  background: #303641;
  color: #8d97ad;
  font-size: 1em;
  letter-spacing: 2px;
  width: 20%;
  line-height: 22px;
`;
export default class Friends extends Component {

  render () {
    return(
      <React.Fragment>
         <AppContainer>
          <Navigation>
            <SideNav >
              <FriendsListBox key={1} {...this.props} />
            </SideNav>
          </Navigation>
          <section>
            <FriendsProfileBox deleteFriend={this.props.deleteFriend} {...this.props} />
          </section>
        </AppContainer>
      </React.Fragment>
    )
  }
}
