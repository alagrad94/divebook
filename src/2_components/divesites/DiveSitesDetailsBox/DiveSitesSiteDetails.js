import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DiveSitesSiteDetails extends Component {

  render () {
    return(

      this.props.diveSite.map(site =>
        <div key={site.id} className="ds_site_details">
        <p className="ds-details divesite_name" >{'Name:'} {site.name}</p><br />
        <p className="ds-details divesite_location" >{'Location:'} {site.city}, {site.state} {site.zip}<br />
        {site.country}</p>
        <p className="ds-details divesite_water_type" >{'Water Type:'} {site.waterType.waterType}</p><br />
        <p className="ds-details divesite_dive_type" >{'Dive Type Available:'} {site.diveType.diveType}</p><br />
        <p className="ds-details divesite_depth" >{'Water Depth:'} {site.depth}</p><br />
        <p className="ds-details divesite_landAttractions" >{'Things to do on shore:'} {site.landAttractions}</p><br />
        <p className="ds-details divesite_underwaterAttractions" >{'Things to see under water:'} {site.underwaterAttractions}</p><br />

        <Link to={{pathname: `/divesites/${site.id}/edit`, state: {fetch: "PUT", diveSite: this.props.data.diveSite}}}><button className="button ds_edit_divesite_button">Edit Dive Site</button></Link>
        </div>
      )
    )
  }
}