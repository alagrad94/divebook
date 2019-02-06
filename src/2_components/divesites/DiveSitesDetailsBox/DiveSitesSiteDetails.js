import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DiveSitesSiteDetails extends Component {

  render () {
    return(

      this.props.diveSite.map(site =>
        <div key={site.id}>
        <h1>{site.name}</h1>
        <Link to={{pathname: `/divesites/${site.id}/edit`, state: {fetch: "PUT", diveSite: this.props.data.diveSite}}}><button>Edit Dive Site</button></Link>
        </div>
      )
    )
  }
}