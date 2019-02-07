import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DiveLogDiveDetails extends Component {

  render () {
    return(

      this.props.entry.map(log =>
        <div key={log.id} className="dl_dive_details" >
        <p className="dl_dive_details divesite_name">{'Dive Site:'} {log.diveSite.name}</p><br />
        <p className="dl_dive_details dive_date">{'Date:'} {log.diveDate}</p><br />
        <p className="dl_dive_details dive_start_time">{'Start:'} {log.diveStartTime}</p><br />
        <p className="dl_dive_details dive_end_time">{'End:'} {log.diveEndTime}</p><br />
        <p className="dl_dive_details dive_bottom_time">{'End:'} {log.bottomTime}</p><br />
        <p className="dl_dive_details dive_type">{'Dive Type:'} {log.diveType.diveType}</p><br />
        <p className="dl_dive_details dive_air_mix">{'Air Used:'} {log.airMix.airType}</p><br />
        <p className="dl_dive_details dive_water">{'Water Type:'} {log.waterType.waterType}</p><br />
        <p className="dl_dive_details dive_air_temp">{'Air Temperature:'} {log.airTemp}</p><br />
        <p className="dl_dive_details dive_surface_temp">{'Surface Water Temperature:'} {log.surfaceTemp}</p><br />
        <p className="dl_dive_details dive_bottom_temp">{'Bottom Water Temperature:'} {log.bottomTemp}</p><br />
        <p className="dl_dive_details dive_depth">{'Dive Depth:'} {log.diveDepth}</p><br />
        <p className="dl_dive_details dive_vis">{'Visibility:'} {log.vis}</p><br />
        <p className="dl_dive_details dive_precip">{'Precipitation:'} {log.precipType.precipType}</p><br />
        <p className="dl_dive_details dive_equip">{'Equipment Used:'} {log.equipment}</p><br />
        <p className="dl_dive_details dive_comments">{'Comments:'} {log.comments}</p><br />

        <Link to={{pathname: `/divelog/${log.id}/edit`, state: {fetch: "PUT", diveLog: this.props.data.diveLog}}}><button className="button dl_edit_button" >Edit Log Entry</button></Link>
        <button type="button" className="button dl_delete_button" onClick={()=> this.props.deleteLogEntry(log.id)} >Delete Log Entry</button>
        </div>
      )
    )
  }
}