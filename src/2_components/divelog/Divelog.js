import React, { Component } from 'react'
import EntriesListBox from './EntriesListBox/EntriesListBox'
import DiveDetailsBox from './DiveDetailsBox/DiveDetailsBox'
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
  width: 15%;
  line-height: 22px;
`;
const Body = styled(BaseBody)`
  height: calc(100vh - 40px);
`;
export default class Divelog extends Component {

  render () {
    return(
      <React.Fragment>
         <AppContainer>
          <Navigation>
            <SideNav >
              <EntriesListBox className="dl_entries_box" key={1} {...this.props}/>
            </SideNav>
          </Navigation>
          <Body>
            <DiveDetailsBox className="dl_dive_details_box" {...this.props} />
          </Body>
        </AppContainer>
      </React.Fragment>
    )
  }
}