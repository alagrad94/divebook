import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap';
import CloudinaryUploadWidget from '../../photos/CloudinaryUploadWidget';
import divebookData from '../../../1_modules/divebookData';

export default class DiveLogDiveDetails extends Component {

  state = {
    diveImages: []
  }

  //Builds the array of imagaes to be displayed for each divelog entry.
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
      <Card key={log.id} className="dl_dive_details_card">
        <Card.Body className="dl_dive_details_card_1">
          <Card.Text className="dl_dive_details divesite_name"><strong>{'Dive Site:'}</strong> {log.diveSite.name}</Card.Text>
          <Card.Text className="dl_dive_details dive_date"><strong>{'Date:'}</strong> {log.diveDate}</Card.Text>
          <Card.Text className="dl_dive_details dive_start_time"><strong>{'Start:'}</strong> {log.diveStartTime}</Card.Text>
          <Card.Text className="dl_dive_details dive_end_time"><strong>{'End:'}</strong> {log.diveEndTime}</Card.Text>
          <Card.Text className="dl_dive_details dive_bottom_time"><strong>{'Bottom Time:'}</strong> {log.bottomTime}</Card.Text>
          <Card.Text className="dl_dive_details dive_type"><strong>{'Dive Type:'}</strong> {log.diveType.diveType}</Card.Text>
          <Card.Text className="dl_dive_details dive_air_mix"><strong>{'Air Used:'}</strong> {log.airMix.airType}</Card.Text>
          <Card.Text className="dl_dive_details dive_water"><strong>{'Water Type:'}</strong> {log.waterType.waterType}</Card.Text>
          <Card.Text className="dl_dive_details dive_air_temp"><strong>{'Air Temperature:'}</strong> {log.airTemp}</Card.Text>
          <Card.Text className="dl_dive_details dive_surface_temp"><strong>{'Surface Water Temperature:'}</strong> {log.surfaceTemp}</Card.Text>
          <Card.Text className="dl_dive_details dive_bottom_temp"><strong>{'Bottom Water Temperature:'}</strong> {log.bottomTemp}</Card.Text>
          <Card.Text className="dl_dive_details dive_depth"><strong>{'Dive Depth:'}</strong> {log.diveDepth}</Card.Text>
          <Card.Text className="dl_dive_details dive_vis"><strong>{'Visibility:'}</strong> {log.vis}</Card.Text>
          <Card.Text className="dl_dive_details dive_precip"><strong>{'Precipitation:'}</strong> {log.precipType.precipType}</Card.Text>
          <Card.Text className="dl_dive_details dive_equip"><strong>{'Equipment Used:'}</strong> {log.equipment}</Card.Text>
          <Card.Text className="dl_dive_details dive_comments"><strong>{'Comments:'}</strong> {log.comments}</Card.Text>
          <Button variant="primary" type="button" className="button dl_delete_button" onClick={()=> this.props.deleteLogEntry(log.id)}>Delete Log Entry</Button><br />
          <Link className="button_link" to={{pathname: `/divelog/${log.id}/edit`, state: {fetch: "PUT", diveLog: this.props.data.diveLog}}}><Button className="button dl_edit_button" >Edit Log Entry</Button></Link>
          <Link className="button_link" to={{pathname: "/divelogentry/new", state: {fetch: "POST"}}}><Button className="button">Add New Dive</Button></Link>
          <CloudinaryUploadWidget user={this.props.data.currentUser[0]} {...this.props}></CloudinaryUploadWidget>
        </Card.Body>
        <Card.Body className="dl_dive_details_card_2">
        {
          this.state.diveImages.map(image =>
            <Link key={image.id} className="photo_album_link" to={`/photos/${this.props.entry[0].id}`}><Card.Img  src={image.url} className="divelog_details_photo" ></Card.Img></Link>
          )
        }
        </Card.Body>
      </Card>
        )
    )
  }
}