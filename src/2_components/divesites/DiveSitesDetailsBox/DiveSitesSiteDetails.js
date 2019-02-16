import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';

export default class DiveSitesSiteDetails extends Component {

  render () {
    return(

      this.props.diveSite.map(site =>
        <section key={site.id}>
          <Card className="ds_site_details card_fix" style={{width: "50%"}}>
            <Card.Title className="ds_details divesite_name" ><strong>{'Name:'}</strong> {site.name}</Card.Title>
            <Card.Text className="ds_details divesite_location" style={{marginBottom: "0"}}><strong>{'Location:'}</strong></Card.Text>
              <Card.Text style={{marginLeft: "20px", marginBottom: "0"}}><strong>{'City:'}</strong> {site.city}</Card.Text>
              <Card.Text style={{marginLeft: "20px", marginBottom: "0"}}><strong>{'State:'}</strong> {site.state}</Card.Text>
              <Card.Text style={{marginLeft: "20px", marginBottom: "0"}}><strong>{'Zip Code:'}</strong> {site.zip}</Card.Text>
              <Card.Text style={{marginLeft: "20px"}}><strong>{'Country:'}</strong> {site.country}</Card.Text>
            <Card.Text className="ds_details divesite_water_type" ><strong>{'Water Type:'}</strong> {site.waterType.waterType}</Card.Text>
            <Card.Text className="ds_details divesite_dive_type" ><strong>{'Dive Type Available:'}</strong> {site.diveType.diveType}</Card.Text>
            <Card.Text className="ds_details divesite_depth" ><strong>{'Water Depth:'}</strong> {site.waterDepth}</Card.Text>
            <Card.Text className="ds_details divesite_landAttractions" ><strong>{'Things to do on shore:'}</strong> {site.landAttractions}</Card.Text>
            <Card.Text className="ds_details divesite_underwaterAttractions" ><strong>{'Things to see under water:'}</strong> {site.underwaterAttractions}</Card.Text>
          </Card>
          <Link className="button_link" to={{pathname: `/divesites/${site.id}/edit`, state: {fetch: "PUT", diveSite: this.props.data.diveSite}}}><Button type="button" className="button ds_edit_divesite_button">Edit Dive Site</Button></Link>
          <Link className="button_link" to={{pathname: "/divesitesentry/new", state: {fetch: "POST"}}}><Button type="button" className="button">Add New Dive Site</Button></Link>
        </section>
      )
    )
  }
}