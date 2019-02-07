import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import DiveSitesListBox from './DiveSitesListBox/DiveSitesListBox'
import DiveSitesDetailsBox from './DiveSitesDetailsBox/DiveSitesDetailsBox'
import { AppContainer as BaseAppContainer, ExampleNavigation as BaseNavigation } from '../../containers';
import { SideNav } from 'react-sidenav'
import './divesites.css'

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
          <section>
            <DiveSitesDetailsBox className="ds_dsdetails_box" {...this.props} />
            <Link to={{pathname: "/divesitesentry/new", state: {fetch: "POST"}}}><button>Add New Dive Site</button></Link>
          </section>
        </AppContainer>
      </React.Fragment>
    )
  }
}