import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DiveLogDiveDetails extends Component {

  render () {
    return(

      this.props.entry.map(log =>
        <div key={log.id} className="dl_dive_details" >
        <div className="dl_dive_details divesite_name">{'Dive Site:'} {log.diveSite.name}</div>
        <div className="dl_dive_details dive_date">{'Date:'} {log.diveDate}</div>
        <div className="dl_dive_details dive_start_time">{'Start:'} {log.diveStartTime}</div>
        <div className="dl_dive_details dive_end_time">{'End:'} {log.diveEndTime}</div>
        <div className="dl_dive_details dive_bottom_time">{'End:'} {log.bottomTime}</div>
        <div className="dl_dive_details dive_type">{'Dive Type:'} {log.diveType.diveType}</div>
        <div className="dl_dive_details dive_air_mix">{'Air Used:'} {log.airMix.airType}</div>
        <div className="dl_dive_details dive_water">{'Water Type:'} {log.waterType.waterType}</div>
        <div className="dl_dive_details dive_air_temp">{'Air Temperature:'} {log.airTemp}</div>
        <div className="dl_dive_details dive_surface_temp">{'Surface Water Temperature:'} {log.surfaceTemp}</div>
        <div className="dl_dive_details dive_bottom_temp">{'Bottom Water Temperature:'} {log.bottomTemp}</div>
        <div className="dl_dive_details dive_depth">{'Dive Depth:'} {log.diveDepth}</div>
        <div className="dl_dive_details dive_vis">{'Visibility:'} {log.vis}</div>
        <div className="dl_dive_details dive_precip">{'Precipitation:'} {log.precipType.precipType}</div>
        <div className="dl_dive_details dive_equip">{'Equipment Used:'} {log.equipment}</div>
        <div className="dl_dive_details dive_comments">{'Comments:'} {log.comments}</div>

        <Link to={{pathname: `/divelog/${log.id}/edit`, state: {fetch: "PUT", diveLog: this.props.data.diveLog}}}><button className="button dl_edit_button" >Edit Log Entry</button></Link>
        <button type="button" className="button dl_delete_button" onClick={()=> this.props.deleteLogEntry(log.id)} >Delete Log Entry</button>
        </div>
      )
    )
  }
}