import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardText, Col, CardImg } from 'reactstrap';
import CloudinaryUploadWidget from '../../photos/CloudinaryUploadWidget';
import divebookData from '../../../1_modules/divebookData';

export default class DiveLogDiveDetails extends Component {

  state = {
    diveImages: []
  }

  getDiveImages () {
    let diveImages = [];
      divebookData.handleData({dataSet: "albums", fetchType: "GET", embedItem: `?diveLogEntrieId=${this.props.entry[0].id}`})
      .then(photos => photos.forEach(photo => {
        diveImages.push({id: photo.id, url: photo.original})
      }))
      .then(() => this.setState({diveImages: diveImages}, ()=>null))
  }

  componentDidMount () {
      this.getDiveImages();
  }

  render () {

    return(
      this.props.entry.map(log =>
        <section key={log.id}>
        <Card className="dl_dive_details_card">
          <Col className="dl_dive_details_card_1">
            <CardText className="dl_dive_details divesite_name"><strong>{'Dive Site:'}</strong> {log.diveSite.name}</CardText>
            <CardText className="dl_dive_details dive_date"><strong>{'Date:'}</strong> {log.diveDate}</CardText>
            <CardText className="dl_dive_details dive_start_time"><strong>{'Start:'}</strong> {log.diveStartTime}</CardText>
            <CardText className="dl_dive_details dive_end_time"><strong>{'End:'}</strong> {log.diveEndTime}</CardText>
            <CardText className="dl_dive_details dive_bottom_time"><strong>{'Bottom Time:'}</strong> {log.bottomTime}</CardText>
            <CardText className="dl_dive_details dive_type"><strong>{'Dive Type:'}</strong> {log.diveType.diveType}</CardText>
            <CardText className="dl_dive_details dive_air_mix"><strong>{'Air Used:'}</strong> {log.airMix.airType}</CardText>
            <CardText className="dl_dive_details dive_water"><strong>{'Water Type:'}</strong> {log.waterType.waterType}</CardText>
            <CardText className="dl_dive_details dive_air_temp"><strong>{'Air Temperature:'}</strong> {log.airTemp}</CardText>
            <CardText className="dl_dive_details dive_surface_temp"><strong>{'Surface Water Temperature:'}</strong> {log.surfaceTemp}</CardText>
            <CardText className="dl_dive_details dive_bottom_temp"><strong>{'Bottom Water Temperature:'}</strong> {log.bottomTemp}</CardText>
            <CardText className="dl_dive_details dive_depth"><strong>{'Dive Depth:'}</strong> {log.diveDepth}</CardText>
            <CardText className="dl_dive_details dive_vis"><strong>{'Visibility:'}</strong> {log.vis}</CardText>
            <CardText className="dl_dive_details dive_precip"><strong>{'Precipitation:'}</strong> {log.precipType.precipType}</CardText>
            <CardText className="dl_dive_details dive_equip"><strong>{'Equipment Used:'}</strong> {log.equipment}</CardText>
            <CardText className="dl_dive_details dive_comments"><strong>{'Comments:'}</strong> {log.comments}</CardText>
            <Link className="button_link" to={{pathname: `/divelog/${log.id}/edit`, state: {fetch: "PUT", diveLog: this.props.data.diveLog}}}><button className="button dl_edit_button" >Edit Log Entry</button></Link>
            <button type="button" className="button dl_delete_button" onClick={()=> this.props.deleteLogEntry(log.id)} >Delete Log Entry</button>
            <Link className="button_link" to={{pathname: "/divelogentry/new", state: {fetch: "POST"}}}><button className="button">Add New Dive</button></Link>
            <CloudinaryUploadWidget user={this.props.data.currentUser[0]} {...this.props}></CloudinaryUploadWidget>
          </Col>
          <Col className="dl_dive_details_card_2">
          {
            this.state.diveImages.map(image =>
              <Link key={image.id} className="photo_album_link" to={`/photos/${this.props.entry[0].id}`}><CardImg  src={image.url} className="divelog_details_photo" ></CardImg></Link>
            )
          }
          </Col>
        </Card>
      </section>
        )
    )
  }
}