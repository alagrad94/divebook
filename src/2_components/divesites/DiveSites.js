import React, { Component } from 'react'
import styled from 'styled-components'
import DiveSitesListBox from './DiveSitesListBox/DiveSitesListBox'
import DiveSitesDetailsBox from './DiveSitesDetailsBox/DiveSitesDetailsBox'
import { AppContainer as BaseAppContainer, ExampleNavigation as BaseNavigation, ExampleBody as BaseBody } from '../../containers';
import { SideNav } from 'react-sidenav'

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

export default class DiveSites extends Component {

  render () {
    return(
      <React.Fragment>
         <AppContainer>
          <Navigation>
            <SideNav >
              <DiveSitesListBox className="ds_dslist_box" key={1} {...this.props}/>
            </SideNav>
          </Navigation>
          <Body>
            <DiveSitesDetailsBox className="ds_dsdetails_box" {...this.props} />

          </Body>
        </AppContainer>
      </React.Fragment>
    )
  }
}