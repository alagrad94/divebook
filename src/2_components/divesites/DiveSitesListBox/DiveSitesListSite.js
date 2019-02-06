import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DiveSitesListSite extends Component {

  render () {
    return(

      this.props.site.map(dsite =>
        <Link key={dsite.id} to={{pathname: `/divesites/${dsite.id}`, dsite:{id: dsite.id}}}><h5 width="100%" className="logEntryLink" >{dsite.name}<br /></h5></Link>
      )
    )
  }
}