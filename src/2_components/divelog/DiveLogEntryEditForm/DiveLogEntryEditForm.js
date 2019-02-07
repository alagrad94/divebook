import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import '../divelog.css'


export default class DiveLogEntryEditForm extends Component {

  constructor(props) {

    super(props);
    this.state = {

      diveSiteNames: [],
			diveSiteId: 0,
			diveTypeId: 0,
			waterTypeId: 0,
			airMixId: 0,
			precipTypeId: 0,
			diveDate: "",
			diveStartTime: "",
			diveEndTime: "",
			bottomTime: "",
			equipment: "",
			airTemp: 0,
			surfaceTemp: 0,
			bottomTemp: 0,
			diveDepth: 0,
			vis: 0,
			comments: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEntry = this.handleEntry.bind(this)
    this.buildDiveSiteSelectOptions = this.buildDiveSiteSelectOptions.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
    });
    }

	handleEntry = evt => {
    evt.preventDefault();
    let userId = Number(sessionStorage.getItem("user"))

    if (this.props.location.state.fetch === "PUT") {

      let entryObject = {
        "userId": userId,
        "id": Number(this.props.match.params.id),
        "diveSiteId": Number(this.state.diveSiteId),
        "diveTypeId": Number(this.state.diveTypeId),
        "waterTypeId": Number(this.state.waterTypeId),
        "airMixId": Number(this.state.airMixId),
        "precipTypeId": Number(this.state.precipTypeId),
        "diveDate": this.state.diveDate,
        "diveStartTime": this.state.diveStartTime,
        "diveEndTime": this.state.diveEndTime,
        "bottomTime": this.state.bottomTime,
        "equipment": this.state.equipment,
        "airTemp": this.state.airTemp,
        "surfaceTemp": this.state.surfaceTemp,
        "bottomTemp": this.state.bottomTemp,
        "diveDepth": this.state.diveDepth,
        "vis": this.state.vis,
        "comments": this.state.comments
      }
      console.log("PUT", entryObject)
      this.props.editLogEntry(entryObject)

    } else if (this.props.location.state.fetch === "POST") {

      let entryObject = {
        "userId": userId,
        "diveSiteId": Number(this.state.diveSiteId),
        "diveTypeId": Number(this.state.diveTypeId),
        "waterTypeId": Number(this.state.waterTypeId),
        "airMixId": Number(this.state.airMixId),
        "precipTypeId": Number(this.state.precipTypeId),
        "diveDate": this.state.diveDate,
        "diveStartTime": this.state.diveStartTime,
        "diveEndTime": this.state.diveEndTime,
        "bottomTime": this.state.bottomTime,
        "equipment": this.state.equipment,
        "airTemp": this.state.airTemp,
        "surfaceTemp": this.state.surfaceTemp,
        "bottomTemp": this.state.bottomTemp,
        "diveDepth": this.state.diveDepth,
        "vis": this.state.vis,
        "comments": this.state.comments
      }
      console.log("POST", entryObject)
      this.props.addLogEntry(entryObject)

    }

  }

  buildDiveSiteSelectOptions () {
    let diveSiteNames = [];
    divebookData.handleData({dataSet: 'diveSites', fetchType: 'GET', embedItem: ""})
    .then(entries => {
      entries.forEach(entry => {
        if (!diveSiteNames.includes({name: entry.name, id: entry.id})) {
          diveSiteNames.push({name: entry.name, id: entry.id})
        }
      });
      this.setState({diveSiteNames : diveSiteNames})
    })
  }

  prepopulateForm() {
    let diveLogInfo = this.props.location.state.diveLog
    diveLogInfo.map(log =>

      this.setState({diveSiteId: log.diveSiteId, diveTypeId: log.diveTypeId, waterTypeId: log.waterTypeId, airMixId: log.airMixId, precipTypeId: log.precipTypeId, diveDate: log.diveDate, diveStartTime: log.diveStartTime, diveEndTime: log.diveEndTime, bottomTime: log.bottomTime, equipment: log.equipment, airTemp: log.airTemp, surfaceTemp: log.surfaceTemp, bottomTemp: log.bottomTemp, diveDepth: log.diveDepth, vis: log.vis, comments: log.comments}, console.log(this.state.diveDate))
    )

  }
  componentDidMount () {
    this.buildDiveSiteSelectOptions();
    if (this.props.location.state.fetch === "PUT") {
      this.prepopulateForm();
    }
  }

  render () {

    return(
      <React.Fragment>
        <form className="dl_entry_edit_form" onSubmit={this.handleEntry}>
          <label className="dl_entry_edit_form dive_date form_label">Dive Date
          <input type="date" name="diveDate" className="dl_entry_edit_form dive_date form_input" required={true} value={this.state.diveDate} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form form_field dive_start_time form_label" >Dive Start Time
          <input type="time" name="diveStartTime" className="dl_entry_edit_form dive_start_time form_input" value={this.state.diveStartTime} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form form_field dive_end_time form_label">Dive End Time
          <input type="time" name="diveEndTime" className="dl_entry_edit_form dive_end_time form_input" value={this.state.diveEndTime} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form form_field dive_bottom_time form_label">Bottom Time
          <input name="bottomTime" className="dl_entry_edit_form dive_bottom_time form_input" value={this.state.bottomTime} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form dive_divesite form_label">Select A Dive Site</label>
            <select name="diveSiteId" className="dl_entry_edit_form dive_divesite form_select" value={this.state.diveSiteId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              {
                this.state.diveSiteNames.map(diveSite =>(
                  <option key={diveSite.id} value={diveSite.id}>{diveSite.name}</option>
                ))
              }
            </select>
            <button className="button dl_entry_edit_form create_divesite_button" onClick={()=> {this.props.history.push("/divesites/new")}}>Create a New Dive Site</button><br />
          <label className="dl_entry_edit_form dive_dive_type form_label">Dive Type</label>
          <select name="diveTypeId" className="dl_entry_edit_form dive_dive_type form_select" value={this.state.diveTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Open Water - Ocean</option>
            <option key={2} value={2}>Open Water - Lake</option>
            <option key={3} value={3}>Open Water - Quarry</option>
            <option key={4} value={4}>Open Water - Other</option>
            <option key={5} value={5}>River</option>
            <option key={6} value={6}>Wreck</option>
            <option key={7} value={7}>Cave</option>
          </select><br />
          <label className="dl_entry_edit_form dive_water_type form_label">Water Type</label>
          <select name="waterTypeId" className="dl_entry_edit_form dive_water_type form_select" value={this.state.waterTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Salt</option>
            <option key={2} value={2}>Fresh</option>
            <option key={3} value={3}>Brackish</option>
          </select><br />
          <label className="dl_entry_edit_form dive_air_mix form_label">Air Mix</label>
          <select name="airMixId" className="dl_entry_edit_form dive_air_mix form_select" value={this.state.airMixId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Air</option>
            <option key={2} value={2}>Nitrox</option>
            <option key={3} value={3}>Trimix</option>
            <option key={4} value={4}>Heliox</option>
          </select><br />
          <label className="dl_entry_edit_form dive_precip_type form_label">Precipitation</label>
          <select name="precipTypeId" className="dl_entry_edit_form dive_precip_type form_select" value={this.state.precipTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Sunny</option>
            <option key={2} value={2}>Rain</option>
            <option key={3} value={3}>Sleet</option>
            <option key={4} value={4}>Snow</option>
          </select><br />
          <label className="dl_entry_edit_form dive_air_temp form_label">Air Temperature
          <input name="airTemp" className="dl_entry_edit_form dive_air_temp form_input" value={this.state.airTemp} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form dive_surface_temp form_label">Surface Temperature
          <input name="surfaceTemp" className="dl_entry_edit_form dive_surface_temp form_input" value={this.state.surfaceTemp} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form dive_bottom_temp form_label">Bottom Temperature
          <input name="bottomTemp" className="dl_entry_edit_form dive_bottom_tem form_input" value={this.state.bottomTemp} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form dive_vis form_label">Visibility
          <input name="vis" className="dl_entry_edit_form dive_vis form_input" value={this.state.vis} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form dive_depth form_label">Depth
          <input type="text" className="dl_entry_edit_form dive_depth form_input" name="diveDepth" value={this.state.diveDepth} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form dive_equip form_label">Equipment Used
          <textarea name="equipment" className="dl_entry_edit_form dive_equip form_textarea" value={this.state.equipment} onChange={this.handleInputChange} /></label><br />
          <label className="dl_entry_edit_form dive_comments form_label">Comments
          <textarea name="comments" className="dl_entry_edit_form dive_comments form_textarea" value={this.state.comments} onChange={this.handleInputChange} /></label><br />
          <input className="button dl_entry_edit_form submit_dl_entry_button" type="submit" />
        </form>;
      </React.Fragment>
    )
  }
}