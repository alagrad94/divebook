import React, { Component } from 'react'
import DiveSitesListSite from './DiveSitesListSite'

export default class DiveSitesListBox extends Component {

  render () {

    return(
      <section>
      {
        this.props.data.diveSites.map(site => (
          <DiveSitesListSite key={site.id} site={[site]} {...this.props} />
          ))
      }
      </section>
    )
  }
}