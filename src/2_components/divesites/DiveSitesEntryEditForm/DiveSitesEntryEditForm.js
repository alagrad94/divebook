import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class DiveSiteEntryEditForm extends Component {

  constructor(props) {

    super(props);
    this.state = {

      waterTypes: [],
      diveTypes: [],
			name: "",
			city: "",
			state: "",
			country: "",
			zip: 0,
			landAttractions: "",
			underwaterAttractions: "",
			waterDepth: 0,
			waterTypeId: 0,
			diveTypeId: 0
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEntry = this.handleEntry.bind(this)
    this.prepopulateForm = this.prepopulateForm.bind(this)
    this.buildSelectOptions = this.buildSelectOptions.bind(this)
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

    if (this.props.location.state.fetch === "PUT") {

      let entryObject = {
        "id": Number(this.props.match.params.id),
        "name": this.state.name,
        "diveTypeId": Number(this.state.diveTypeId),
        "waterTypeId": Number(this.state.waterTypeId),
        "waterDepth": this.state.waterDepth,
        "city": this.state.city,
        "state": this.state.state,
        "coutnry": this.state.coutnry,
        "zip": this.state.zip,
        "landAttractions": this.state.landAttractions,
        "underwaterAttractions": this.state.underwaterAttractions
      }
      console.log("PUT", entryObject)
      this.props.editDiveSite(entryObject)

    } else if (this.props.location.state.fetch === "POST") {

      let entryObject = {
        "name": this.state.name,
        "diveTypeId": Number(this.state.diveTypeId),
        "waterTypeId": Number(this.state.waterTypeId),
        "waterDepth": this.state.waterDepth,
        "city": this.state.city,
        "state": this.state.state,
        "coutnry": this.state.coutnry,
        "zip": this.state.zip,
        "landAttractions": this.state.landAttractions,
        "underwaterAttractions": this.state.underwaterAttractions
      }
      console.log("POST", entryObject)
      this.props.addDiveSite(entryObject)

    }
  }
  //Builds the options that appear on each select in the form.  Doing this allows a simple change in the database tables (adding/removing options) to be reflected in the form selects without changing the code.
  buildSelectOptions () {

    let waterTypes =  [];
    let diveTypes =  [];

    divebookData.handleData({dataSet: 'waterTypes', fetchType: 'GET', embedItem: ""})
    .then(waters => {
      waters.forEach(type => {
        if (!waterTypes.includes({waterType: type.waterType, id: type.id})) {
          waterTypes.push({waterType: type.waterType, id: type.id})}})
          waterTypes.sort((a,b) => a.waterType.localeCompare(b.waterType))
        })
    .then(()=> divebookData.handleData({dataSet: 'diveTypes', fetchType: 'GET', embedItem: ""}))
    .then(dives => {
      dives.forEach(type => {
        if (!diveTypes.includes({diveType: type.diveType, id: type.id})) {
          diveTypes.push({diveType: type.diveType, id: type.id})}})
          diveTypes.sort((a,b) => a.diveType.localeCompare(b.diveType))
        })
    .then(() => this.setState({waterTypes: waterTypes, diveTypes: diveTypes}, ()=> null))
  }

   //If the user routes to the form via an edit link the fetch property is "PUT", if they route to the form via an add link it is "POST".  This allows using one form for both editing and adding.  If it is an edit, then the form is prepopulated with existing data, otherwise the fields are blank.
  prepopulateForm() {
    let diveSiteId = Number(this.props.match.params.id)
    divebookData.handleData({dataSet: "diveSites", fetchType: "GET", embedItem: `/${diveSiteId}`})
    .then(sites => {
      this.setState({name: sites.name, city: sites.city, state: sites.state, country: sites.country, zip: sites.zip, landAttractions: sites.landAttractions, underwaterAttractions: sites.underwaterAttractions, waterDepth: sites.waterDepth, waterTypeId: sites.waterTypeId, diveTypeId: sites.diveTypeId}, console.log("Hi"))
    })
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
        <Form className="ds_entry_edit_form whole_form" onSubmit={this.handleEntry}>
        <Form.Row className="title_row"><Form.Label className="form_title">CREATE A NEW DIVE SITE</Form.Label></Form.Row>
          <Form.Row className="form_row">
            <Form.Group className="form_group" controlId="name">
              <Form.Label size="sm" className="ds_entry_edit_form site_name form_label">Name</Form.Label>
              <Form.Control as='input' size="sm" className="ds_entry_edit_form site_name form_input" type="text" name="name" value={this.state.name} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row className="form_row">
            <Form.Group className="form_group" controlId="city">
              <Form.Label size="sm" className="ds_entry_edit_form site_city form_label">City</Form.Label>
              <Form.Control as='input' size="sm" className="ds_entry_edit_form site_city form_input" type="text" name="city" value={this.state.city} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
            <Form.Group className="form_group" controlId="state">
              <Form.Label size="sm" className="ds_entry_edit_form site_state form_label">State</Form.Label>
              <Form.Control as='input' size="sm" className="ds_entry_edit_form site_state form_input" type="text" name="state" value={this.state.state} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
              <Form.Group className="form_group" controlId="zip">
              <Form.Label size="sm" className="ds_entry_edit_form site_zip form_label">Zip Code</Form.Label>
            <Form.Control as='input' size="sm" className="ds_entry_edit_form site_zip form_input" name="zip" type="text" value={this.state.zip} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
              <Form.Group className="form_group" controlId="country">
              <Form.Label size="sm" className="ds_entry_edit_form site_country form_label">Country</Form.Label>
            <Form.Control as='input' size="sm" className="ds_entry_edit_form site_country form_input" name="country" type="text" value={this.state.country} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="waterDepth">
          <Form.Label size="sm" className="ds_entry_edit_form site_depth form_label">Depth</Form.Label>
          <Form.Control as='input' type="text" size="sm" className="ds_entry_edit_form site_depth form_input" name="waterDepth" value={this.state.waterDepth} onChange={this.handleInputChange}></Form.Control>
          </Form.Group>
          <Form.Group className="form_group" controlId="diveTypeId">
          <Form.Label size="sm" className="ds_entry_edit_form site_dive_type form_label">Dive Type</Form.Label>
          <Form.Control as='select' size="sm" className="ds_entry_edit_form site_dive_type form_select" name="diveTypeId" value={this.state.diveTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            {this.state.diveTypes.map(diveType =>(
              <option key={diveType.id} value={diveType.id}>{diveType.diveType}</option>))
            }
          </Form.Control>
          </Form.Group>
          <Form.Group className="form_group" controlId="waterTypeId">
          <Form.Label size="sm" className="ds_entry_edit_form site_water_type form_label">Water Type</Form.Label>
          <Form.Control as='select' size="sm" className="ds_entry_edit_form site_water_type form_select"name="waterTypeId"  value={this.state.waterTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            {this.state.waterTypes.map(waterType =>(
              <option key={waterType.id} value={waterType.id}>{waterType.waterType}</option>))
            }
          </Form.Control>
          </Form.Group>
          </Form.Row>
          <Form.Row className="form_row">
            <Form.Group className="form_group" controlId="landAttractions">
              <Form.Label size="sm" className="ds_entry_edit_form site_landAttractions form_label">Things to do on shore nearby</Form.Label>
              <Form.Control as="textarea" size="sm" className="ds_entry_edit_form site_landAttractions form_textarea" name="landAttractions" value={this.state.landAttractions} onChange={this.handleInputChange}></Form.Control>
           </Form.Group>
          </Form.Row>
          <Form.Row className="form_row">
            <Form.Group className="form_group" controlId="underwaterAttractions">
              <Form.Label size="sm" className="ds_entry_edit_form site_underwaterAttractions form_label">Things to see underwater</Form.Label>
              <Form.Control as="textarea" size="sm" className="ds_entry_edit_form site_underwaterAttractions form_textarea" name="underwaterAttractions" value={this.state.underwaterAttractions} onChange={this.handleInputChange}></Form.Control>
            </Form.Group>
          </Form.Row>
          <Button as="input" type="submit" size="sm" className="button ds_entry_edit_form submit_button" />
        </Form>
        </section>
    )
  }
}