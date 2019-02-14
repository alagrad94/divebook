import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { CardTitle, Card, CardText } from 'reactstrap';

export default class DiveSitesSiteDetails extends Component {

  render () {
    return(

      this.props.diveSite.map(site =>
        <section key={site.id}>
          <Card className="ds_site_details card_fix" style={{width: "50%"}}>
            <CardTitle className="ds-details divesite_name" ><strong>{'Name:'}</strong> {site.name}</CardTitle>
            <CardText className="ds-details divesite_location" style={{marginBottom: "0"}}><strong>{'Location:'}</strong></CardText>
              <CardText style={{marginLeft: "20px", marginBottom: "0"}}><strong>{'City:'}</strong> {site.city}</CardText>
              <CardText style={{marginLeft: "20px", marginBottom: "0"}}><strong>{'State:'}</strong> {site.state}</CardText>
              <CardText style={{marginLeft: "20px", marginBottom: "0"}}><strong>{'Zip Code:'}</strong> {site.zip}</CardText>
              <CardText style={{marginLeft: "20px"}}><strong>{'Country:'}</strong> {site.country}</CardText>
            <CardText className="ds-details divesite_water_type" ><strong>{'Water Type:'}</strong> {site.waterType.waterType}</CardText>
            <CardText className="ds-details divesite_dive_type" ><strong>{'Dive Type Available:'}</strong> {site.diveType.diveType}</CardText>
            <CardText className="ds-details divesite_depth" ><strong>{'Water Depth:'}</strong> {site.waterDepth}</CardText>
            <CardText className="ds-details divesite_landAttractions" ><strong>{'Things to do on shore:'}</strong> {site.landAttractions}</CardText>
            <CardText className="ds-details divesite_underwaterAttractions" ><strong>{'Things to see under water:'}</strong> {site.underwaterAttractions}</CardText>
          </Card>
          <Link className="button_link" to={{pathname: `/divesites/${site.id}/edit`, state: {fetch: "PUT", diveSite: this.props.data.diveSite}}}><button className="button ds_edit_divesite_button">Edit Dive Site</button></Link>
          <Link className="button_link" to={{pathname: "/divesitesentry/new", state: {fetch: "POST"}}}><button className="button">Add New Dive Site</button></Link>
        </section>
      )
    )
  }
}