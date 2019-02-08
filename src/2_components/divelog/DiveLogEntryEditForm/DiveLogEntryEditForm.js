import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      <section className="form_container">
      <Form className="dl_entry_edit_form whole_form" onSubmit={e => this.handleEntry(e)}>
      <Form.Row className="title_row"><Form.Label className="form_title">CREATE A NEW LOG ENTRY</Form.Label></Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="diveDate">
            <Form.Label size="sm" className="dl_entry_edit_form dive_date form_label">Dive Date
            <Form.Control as='input' size="sm" type="date" name="diveDate" className="dl_entry_edit_form dive_date form_input" required={true} value={this.state.diveDate} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="diveSiteId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_divesite form_Label">Select A Dive Site</Form.Label>
            <Form.Control as="select" size="sm" name="diveSiteId" className="dl_entry_edit_form dive_divesite form_select" value={this.state.diveSiteId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              {this.state.diveSiteNames.map(diveSite =>(
                <option key={diveSite.id} value={diveSite.id}>{diveSite.name}</option>))
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Button className="button dl_entry_edit_form create_divesite_button" onClick={()=> {this.props.history.push("/divesites/new")}}>Create a New Dive Site</Button>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="diveStartTime">
            <Form.Label size="sm" className="dl_entry_edit_form form_field dive_start_time form_label" >Dive Start Time
            <Form.Control as='input' type="time" size="sm" name="diveStartTime" className="dl_entry_edit_form dive_start_time form_input" value={this.state.diveStartTime} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="diveEndTime">
            <Form.Label size="sm" className="dl_entry_edit_form form_field dive_end_time form_label">Dive End Time
            <Form.Control as='input' type="time" size="sm" name="diveEndTime" className="dl_entry_edit_form dive_end_time form_input" value={this.state.diveEndTime} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="bottomTime">
            <Form.Label size="sm" className="dl_entry_edit_form form_field dive_bottom_time form_label">Bottom Time
            <Form.Control as='input' type="text" name="bottomTime" size="sm" className="dl_entry_edit_form dive_bottom_time form_input" value={this.state.bottomTime} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="diveTypeId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_dive_type form_label">Dive Type</Form.Label>
            <Form.Control as='select' size="sm" name="diveTypeId" className="dl_entry_edit_form dive_dive_type form_select" value={this.state.diveTypeId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              <option key={1} value={1}>Open Water - Ocean</option>
              <option key={2} value={2}>Open Water - Lake</option>
              <option key={3} value={3}>Open Water - Quarry</option>
              <option key={4} value={4}>Open Water - Other</option>
              <option key={5} value={5}>River</option>
              <option key={6} value={6}>Wreck</option>
              <option key={7} value={7}>Cave</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="form_group" controlId="waterTypeId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_water_type form_label">Water Type</Form.Label>
            <Form.Control as='select' size="sm" name="waterTypeId" className="dl_entry_edit_form dive_water_type form_select" value={this.state.waterTypeId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              <option key={1} value={1}>Salt</option>
              <option key={2} value={2}>Fresh</option>
              <option key={3} value={3}>Brackish</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="form_group" controlId="airMixId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_air_mix form_label">Air Mix</Form.Label>
            <Form.Control as='select' size="sm" name="airMixId" className="dl_entry_edit_form dive_air_mix form_select" value={this.state.airMixId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              <option key={1} value={1}>Air</option>
              <option key={2} value={2}>Nitrox</option>
              <option key={3} value={3}>Trimix</option>
              <option key={4} value={4}>Heliox</option>
            </Form.Control>
          </Form.Group>
          <Form.Group className="form_group" controlId="precipTypeId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_precip_type form_label">Precipitation</Form.Label>
            <Form.Control as='select' size="sm" name="precipTypeId" className="dl_entry_edit_form dive_precip_type form_select" value={this.state.precipTypeId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              <option key={1} value={1}>Sunny</option>
              <option key={2} value={2}>Rain</option>
              <option key={3} value={3}>Sleet</option>
              <option key={4} value={4}>Snow</option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="airTemp">
            <Form.Label size="sm" className="dl_entry_edit_form dive_air_temp form_label">Air Temperature
            <Form.Control as='input' type="text" size="sm" name="airTemp" className="dl_entry_edit_form dive_air_temp form_input" value={this.state.airTemp} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="surfaceTemp">
            <Form.Label size="sm" className="dl_entry_edit_form dive_surface_temp form_label">Surface Temperature
            <Form.Control as='input' type="text" size="sm" name="surfaceTemp" className="dl_entry_edit_form dive_surface_temp form_input" value={this.state.surfaceTemp} onChange={this.handleInputChange} /></Form.Label>
         </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="bottomTemp">
            <Form.Label size="sm" className="dl_entry_edit_form dive_bottom_temp form_label">Bottom Temperature
            <Form.Control as='input' type="text" size="sm" name="bottomTemp" className="dl_entry_edit_form dive_bottom_tem form_input" value={this.state.bottomTemp} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="vis">
            <Form.Label size="sm" className="dl_entry_edit_form dive_vis form_label">Visibility
            <Form.Control as='input' type="text" size="sm" name="vis" className="dl_entry_edit_form dive_vis form_input" value={this.state.vis} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="diveDepth">
            <Form.Label size="sm" className="dl_entry_edit_form dive_depth form_label">Depth
            <Form.Control as='input' size="sm" type="text" className="dl_entry_edit_form dive_depth form_input" name="diveDepth" value={this.state.diveDepth} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="equipment">
            <Form.Label size="sm" className="dl_entry_edit_form dive_equip form_label">Equipment Used
            <Form.Control as="textarea" name="equipment" size="sm" className="dl_entry_edit_form dive_equip form_textarea" value={this.state.equipment} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="comments">
            <Form.Label size="sm" className="dl_entry_edit_form dive_comments form_label">Comments
            <Form.Control as="textarea"  name="comments" size="sm" className="dl_entry_edit_form dive_comments form_textarea" value={this.state.comments} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Button as="input" type="submit" className="button dl_entry_edit_form submit_button"  ></Button>
      </Form>
      </section>
    )
  }
}