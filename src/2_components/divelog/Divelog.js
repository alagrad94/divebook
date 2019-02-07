import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EntriesListBox from './EntriesListBox/EntriesListBox'
import DiveDetailsBox from './DiveDetailsBox/DiveDetailsBox'
import styled from 'styled-components'
import { AppContainer as BaseAppContainer, ExampleNavigation as BaseNavigation } from '../../containers';
import { SideNav } from 'react-sidenav'
import './divelog.css'

const AppContainer = styled(BaseAppContainer)`
  height: calc(100vh - 40px);
`;

const Navigation = styled(BaseNavigation)`
  background: #303641;
  color: #8d97ad;
  font-size: 1em;
  letter-spacing: 2px;
  width: 25%;
  line-height: 22px;
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
          <section>
            <DiveDetailsBox className="dl_dive_details_box" {...this.props} />
            <Link to={{pathname: "/divelogentry/new", state: {fetch: "POST"}}}><button>Add New Dive</button></Link>
          </section>
        </AppContainer>
      </React.Fragment>
    )
  }
}