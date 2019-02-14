import React, { Component } from 'react'
import PhotoAlbumsEntriesListBox from './PhotoAlbumsEntriesListBox'
import AlbumDetailsBox from './AlbumDetailsBox'
import styled from 'styled-components'
import { AppContainer as BaseAppContainer, ExampleNavigation as BaseNavigation, ExampleBody as BaseBody } from '../../../containers';
import { SideNav } from 'react-sidenav'

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
export default class PhotoAlbums extends Component {

  render () {
    return(
      <React.Fragment>
         <AppContainer>
          <Navigation>
            <SideNav >
              <PhotoAlbumsEntriesListBox key={1} {...this.props}/>
            </SideNav>
          </Navigation>
          <Body>
            <AlbumDetailsBox className="dl_dive_details_box" {...this.props} />
          </Body>
        </AppContainer>
      </React.Fragment>
    )
  }
}