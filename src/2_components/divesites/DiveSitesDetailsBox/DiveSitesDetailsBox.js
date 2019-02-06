import React, { Component } from 'react'
import DiveSitesSiteDetails from './DiveSitesSiteDetails'

export default class DiveSiteDetailsBox extends Component {

  render () {
    let diveSite = this.props.data.diveSites.filter(site => site.id === parseInt(this.props.match.params.id))

    return(
      <section>
      {
        diveSite.map(site => (
          <DiveSitesSiteDetails key={site.id} diveSite={[site]} {...this.props} />
          ))
      }
      </section>
    )
  }
}