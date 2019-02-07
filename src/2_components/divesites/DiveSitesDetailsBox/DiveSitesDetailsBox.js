import React, { Component } from 'react'
import DiveSitesSiteDetails from './DiveSitesSiteDetails'

export default class DiveSiteDetailsBox extends Component {

  render () {
    let diveSite = this.props.data.diveSites.filter(site => site.id === parseInt(this.props.match.params.id))

    return(
      <section className="ds_dsdetails_box" >
      {
        diveSite.map(site => (
          <DiveSitesSiteDetails className="ds_site_details" key={site.id} diveSite={[site]} {...this.props} />
          ))
      }
      </section>
    )
  }
}