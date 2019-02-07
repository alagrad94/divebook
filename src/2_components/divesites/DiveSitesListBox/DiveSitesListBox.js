import React, { Component } from 'react'
import DiveSitesListSite from './DiveSitesListSite'

export default class DiveSitesListBox extends Component {

  render () {

    return(
      <section className="ds_dslist_box">
      {
        this.props.data.diveSites.map(site => (
          <DiveSitesListSite className="ds_site_link" key={site.id} site={[site]} {...this.props} />
          ))
      }
      </section>
    )
  }
}