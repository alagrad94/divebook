import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import divebookData from '../../../1_modules/divebookData'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class DiveLogEntryEditForm extends Component {

  constructor(props) {

    super(props);
    this.state = {

      diveSiteNames: [],
      airMixes: [],
      precipTypes: [],
      waterTypes: [],
      diveTypes: [],
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
      comments: "",
      coverPhoto: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEntry = this.handleEntry.bind(this)
    this.buildSelectOptions = this.buildSelectOptions.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({[name]: value});
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
        "comments": this.state.comments,
        "coverPhoto": ""
      }
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
        "comments": this.state.comments,
        "coverPhoto": ""
      }
      this.props.addLogEntry(entryObject)
    }
  }

   //Builds the options that appear on each select in the form.  Doing this allows a simple change in the database tables (adding/removing options) to be reflected in the form selects without changing the code.
  buildSelectOptions () {
    let diveSiteNames = [];
    let airMixes =  [];
    let precipTypes =  [];
    let waterTypes =  [];
    let diveTypes =  [];

    divebookData.handleData({dataSet: 'diveSites', fetchType: 'GET', embedItem: ""})
    .then(entries => {
      entries.forEach(entry => {
        if (!diveSiteNames.includes({name: entry.name, id: entry.id})) {
          diveSiteNames.push({name: entry.name, id: entry.id})}});})
    .then(()=> divebookData.handleData({dataSet: 'airMixes', fetchType: 'GET', embedItem: ""}))
    .then(mixes => {
      mixes.forEach(mix => {
        if (!airMixes.includes({airType: mix.airType, id: mix.id})) {
          airMixes.push({airType: mix.airType, id: mix.id})}});})
    .then(()=> divebookData.handleData({dataSet: 'precipTypes', fetchType: 'GET', embedItem: ""}))
    .then(precips => {
      precips.forEach(preicp => {
        if (!precipTypes.includes({precipType: preicp.precipType, id: preicp.id})) {
          precipTypes.push({precipType: preicp.precipType, id: preicp.id})}});})
    .then(()=> divebookData.handleData({dataSet: 'waterTypes', fetchType: 'GET', embedItem: ""}))
    .then(waters => {
      waters.forEach(type => {
        if (!waterTypes.includes({waterType: type.waterType, id: type.id})) {
          waterTypes.push({waterType: type.waterType, id: type.id})}});})
    .then(()=> divebookData.handleData({dataSet: 'diveTypes', fetchType: 'GET', embedItem: ""}))
    .then(dives => {
      dives.forEach(type => {
        if (!diveTypes.includes({diveType: type.diveType, id: type.id})) {
          diveTypes.push({diveType: type.diveType, id: type.id})}});})
    .then(() => this.setState({diveSiteNames : diveSiteNames, airMixes: airMixes, precipTypes: precipTypes, waterTypes: waterTypes, diveTypes: diveTypes}, ()=> null))
  }


  //If the user routes to the form via an edit link the fetch property is "PUT", if they route to the form via an add link it is "POST".  This allows using one form for both editing and adding.  If it is an edit, then the form is prepopulated with existing data, otherwise the fields are blank.
  prepopulateForm() {
    let diveLogInfo = this.props.location.state.diveLog
    diveLogInfo.map(log =>

      this.setState({diveSiteId: log.diveSiteId, diveTypeId: log.diveTypeId, waterTypeId: log.waterTypeId, airMixId: log.airMixId, precipTypeId: log.precipTypeId, diveDate: log.diveDate, diveStartTime: log.diveStartTime, diveEndTime: log.diveEndTime, bottomTime: log.bottomTime, equipment: log.equipment, airTemp: log.airTemp, surfaceTemp: log.surfaceTemp, bottomTemp: log.bottomTemp, diveDepth: log.diveDepth, vis: log.vis, comments: log.comments, coverPhoto: log.coverPhoto}, ()=> null))
  }

  componentDidMount () {
    this.buildSelectOptions();
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
            <Form.Control as='input' required size="sm" type="date" name="diveDate" className="dl_entry_edit_form dive_date form_input" value={this.state.diveDate} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="diveSiteId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_divesite form_Label">Select A Dive Site</Form.Label>
            <Form.Control as="select" required size="sm" name="diveSiteId" className="dl_entry_edit_form dive_divesite form_select" value={this.state.diveSiteId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              {this.state.diveSiteNames.map(diveSite =>(
                <option key={diveSite.id} value={diveSite.id}>{diveSite.name}</option>))
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
        <Link className="button_link add_ds_button" to={{pathname: "/divesitesentry/new", state: {fetch: "POST"}}}><Button type="button" className="button add_ds_button">Add New Dive Site</Button></Link>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="diveStartTime">
            <Form.Label size="sm" className="dl_entry_edit_form form_field dive_start_time form_label" >Dive Start Time
            <Form.Control as='input' required type="time" size="sm" name="diveStartTime" className="dl_entry_edit_form dive_start_time form_input" value={this.state.diveStartTime} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="diveEndTime">
            <Form.Label size="sm" className="dl_entry_edit_form form_field dive_end_time form_label">Dive End Time
            <Form.Control as='input' required type="time" size="sm" name="diveEndTime" className="dl_entry_edit_form dive_end_time form_input" value={this.state.diveEndTime} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="bottomTime">
            <Form.Label size="sm" className="dl_entry_edit_form form_field dive_bottom_time form_label">Bottom Time
            <Form.Control as='input' required type="text" name="bottomTime" size="sm" className="dl_entry_edit_form dive_bottom_time form_input" value={this.state.bottomTime} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="diveTypeId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_dive_type form_label">Dive Type</Form.Label>
            <Form.Control as='select' required size="sm" name="diveTypeId" className="dl_entry_edit_form dive_dive_type form_select" value={this.state.diveTypeId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              {this.state.diveTypes.map(diveType =>(
                <option key={diveType.id} value={diveType.id}>{diveType.diveType}</option>))
              }
            </Form.Control>
          </Form.Group>
          <Form.Group className="form_group" controlId="waterTypeId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_water_type form_label">Water Type</Form.Label>
            <Form.Control as='select' required size="sm" name="waterTypeId" className="dl_entry_edit_form dive_water_type form_select" value={this.state.waterTypeId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              {this.state.waterTypes.map(waterType =>(
                <option key={waterType.id} value={waterType.id}>{waterType.waterType}</option>))
              }
            </Form.Control>
          </Form.Group>
          <Form.Group className="form_group" controlId="airMixId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_air_mix form_label">Air Mix</Form.Label>
            <Form.Control as='select' required size="sm" name="airMixId" className="dl_entry_edit_form dive_air_mix form_select" value={this.state.airMixId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              {this.state.airMixes.map(airMix =>(
                <option key={airMix.id} value={airMix.id}>{airMix.airType}</option>))
              }
            </Form.Control>
          </Form.Group>
          <Form.Group className="form_group" controlId="precipTypeId">
            <Form.Label size="sm" className="dl_entry_edit_form dive_precip_type form_label">Precipitation</Form.Label>
            <Form.Control as='select' required size="sm" name="precipTypeId" className="dl_entry_edit_form dive_precip_type form_select" value={this.state.precipTypeId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              {this.state.precipTypes.map(precipType =>(
                <option key={precipType.id} value={precipType.id}>{precipType.precipType}</option>))
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="airTemp">
            <Form.Label size="sm" className="dl_entry_edit_form dive_air_temp form_label">Air Temperature
            <Form.Control as='input' required type="text" size="sm" name="airTemp" className="dl_entry_edit_form dive_air_temp form_input" value={this.state.airTemp} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="surfaceTemp">
            <Form.Label size="sm" className="dl_entry_edit_form dive_surface_temp form_label">Surface Temperature
            <Form.Control as='input' required type="text" size="sm" name="surfaceTemp" className="dl_entry_edit_form dive_surface_temp form_input" value={this.state.surfaceTemp} onChange={this.handleInputChange} /></Form.Label>
         </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="bottomTemp">
            <Form.Label size="sm" className="dl_entry_edit_form dive_bottom_temp form_label">Bottom Temperature
            <Form.Control as='input' required type="text" size="sm" name="bottomTemp" className="dl_entry_edit_form dive_bottom_tem form_input" value={this.state.bottomTemp} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="vis">
            <Form.Label size="sm" className="dl_entry_edit_form dive_vis form_label">Visibility
            <Form.Control as='input' required type="text" size="sm" name="vis" className="dl_entry_edit_form dive_vis form_input" value={this.state.vis} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="diveDepth">
            <Form.Label size="sm" className="dl_entry_edit_form dive_depth form_label">Depth
            <Form.Control as='input' required size="sm" type="text" className="dl_entry_edit_form dive_depth form_input" name="diveDepth" value={this.state.diveDepth} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="equipment">
            <Form.Label size="sm" className="dl_entry_edit_form dive_equip form_label">Equipment Used
            <Form.Control as="textarea" required name="equipment" size="sm" className="dl_entry_edit_form dive_equip form_textarea" value={this.state.equipment} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="comments">
            <Form.Label size="sm" className="dl_entry_edit_form dive_comments form_label">Comments
            <Form.Control as="textarea" required  name="comments" size="sm" className="dl_entry_edit_form dive_comments form_textarea" value={this.state.comments} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Button as="input" type="submit" className="button dl_entry_edit_form submit_button"  ></Button>
      </Form>
      </section>
    )
  }
}