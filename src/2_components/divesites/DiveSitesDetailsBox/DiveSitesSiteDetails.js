import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CardTitle, Card, CardText } from 'reactstrap';

export default class DiveSitesSiteDetails extends Component {

  render () {
    return(

      this.props.diveSite.map(site =>
        <Card key={site.id} className="ds_site_details card_fix" style={{width: "50%"}}>
          <CardTitle className="ds-details divesite_name" >{'Name:'} {site.name}</CardTitle>
          <CardText className="ds-details divesite_location" >{'Location:'} {site.city}, {site.state} {site.zip}
          {site.country}</CardText>
          <CardText className="ds-details divesite_water_type" >{'Water Type:'} {site.waterType.waterType}</CardText>
          <CardText className="ds-details divesite_dive_type" >{'Dive Type Available:'} {site.diveType.diveType}</CardText>
          <CardText className="ds-details divesite_depth" >{'Water Depth:'} {site.depth}</CardText>
          <CardText className="ds-details divesite_landAttractions" >{'Things to do on shore:'} {site.landAttractions}</CardText>
          <CardText className="ds-details divesite_underwaterAttractions" >{'Things to see under water:'} {site.underwaterAttractions}</CardText>

          <Link to={{pathname: `/divesites/${site.id}/edit`, state: {fetch: "PUT", diveSite: this.props.data.diveSite}}}><button className="button ds_edit_divesite_button">Edit Dive Site</button></Link>
          <Link to={{pathname: "/divesitesentry/new", state: {fetch: "POST"}}}><button className="button">Add New Dive Site</button></Link>
        </Card>
      )
    )
  }
}