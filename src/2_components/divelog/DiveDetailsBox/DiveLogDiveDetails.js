import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'reactstrap';

export default class DiveLogDiveDetails extends Component {

  render () {
    return(
      this.props.entry.map(log =>
        <Card key={log.id} className="dl_dive_details card_fix" style={{width: "50%"}}>
        <CardText className="dl_dive_details divesite_name">{'Dive Site:'} {log.diveSite.name}</CardText>
        <CardText className="dl_dive_details dive_date">{'Date:'} {log.diveDate}</CardText>
        <CardText className="dl_dive_details dive_start_time">{'Start:'} {log.diveStartTime}</CardText>
        <CardText className="dl_dive_details dive_end_time">{'End:'} {log.diveEndTime}</CardText>
        <CardText className="dl_dive_details dive_bottom_time">{'End:'} {log.bottomTime}</CardText>
        <CardText className="dl_dive_details dive_type">{'Dive Type:'} {log.diveType.diveType}</CardText>
        <CardText className="dl_dive_details dive_air_mix">{'Air Used:'} {log.airMix.airType}</CardText>
        <CardText className="dl_dive_details dive_water">{'Water Type:'} {log.waterType.waterType}</CardText>
        <CardText className="dl_dive_details dive_air_temp">{'Air Temperature:'} {log.airTemp}</CardText>
        <CardText className="dl_dive_details dive_surface_temp">{'Surface Water Temperature:'} {log.surfaceTemp}</CardText>
        <CardText className="dl_dive_details dive_bottom_temp">{'Bottom Water Temperature:'} {log.bottomTemp}</CardText>
        <CardText className="dl_dive_details dive_depth">{'Dive Depth:'} {log.diveDepth}</CardText>
        <CardText className="dl_dive_details dive_vis">{'Visibility:'} {log.vis}</CardText>
        <CardText className="dl_dive_details dive_precip">{'Precipitation:'} {log.precipType.precipType}</CardText>
        <CardText className="dl_dive_details dive_equip">{'Equipment Used:'} {log.equipment}</CardText>
        <CardText className="dl_dive_details dive_comments">{'Comments:'} {log.comments}</CardText>

        <Link to={{pathname: `/divelog/${log.id}/edit`, state: {fetch: "PUT", diveLog: this.props.data.diveLog}}}><button className="button dl_edit_button" >Edit Log Entry</button></Link>
        <button type="button" className="button dl_delete_button" onClick={()=> this.props.deleteLogEntry(log.id)} >Delete Log Entry</button>
        <Link to={{pathname: "/divelogentry/new", state: {fetch: "POST"}}}><button className="button">Add New Dive</button></Link>
        </Card>
        )
    )
  }
}