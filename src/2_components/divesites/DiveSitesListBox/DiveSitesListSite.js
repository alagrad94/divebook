import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DiveSitesListSite extends Component {

  render () {
    return(

      this.props.site.map(dsite =>
        <Link key={dsite.id} to={{pathname: `/divesites/${dsite.id}`, dsite:{id: dsite.id}}}><p width="100%" className="ds_site_link" >{dsite.name}</p></Link>
      )
    )
  }
}