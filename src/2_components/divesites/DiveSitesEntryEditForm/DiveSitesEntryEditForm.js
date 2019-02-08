import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class DiveSiteEntryEditForm extends Component {

  constructor(props) {

    super(props);
    this.state = {

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

  prepopulateForm() {
    let diveSiteId = Number(this.props.match.params.id)
    divebookData.handleData({dataSet: "diveSites", fetchType: "GET", embedItem: `/${diveSiteId}`})
    .then(sites => {
      this.setState({name: sites.name, city: sites.city, state: sites.state, country: sites.country, zip: sites.zip, landAttractions: sites.landAttractions, underwaterAttractions: sites.underwaterAttractions, waterDepth: sites.waterDepth, waterTypeId: sites.waterTypeId, diveTypeId: sites.diveTypeId}, console.log("Hi"))
    })
  }

  componentDidMount () {

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
          <Form.Label size="sm" className="ds_entry_edit_form site_water_type form_label">Water Type</Form.Label>
          <Form.Control as='select' size="sm" className="ds_entry_edit_form site_water_type form_select"name="waterTypeId"  value={this.state.waterTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Salt</option>
            <option key={2} value={2}>Fresh</option>
            <option key={3} value={3}>Brackish</option>
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