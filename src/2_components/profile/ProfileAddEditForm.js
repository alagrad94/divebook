import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class ProfileAddEditForm extends Component {

  constructor(props) {

    super(props);
    this.state = {

      users: [],
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      birthDate: "",
      certLevel: "",
      certOrg: "",
      gender: "",
      city: "",
      state: "",
      country: "",
      zip: "",
      diveInterests: "",
      friends: [],
      userPhoto: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEntry = this.handleEntry.bind(this)
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
        "id": userId,
        "username": this.state.userName,
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "birthDate": this.state.birthDate,
        "certLevel": this.state.certLevel,
        "certOrg": this.state.certOrg,
        "gender": this.state.gender,
        "city": this.state.city,
        "state": this.state.state,
        "country": this.state.country,
        "zip": Number(this.state.zip),
        "diveInterests": this.state.diveInterests,
        "friends": this.state.friends,
        "userPhoto": this.state.userPhoto

      }
      this.props.editUserProfile(entryObject)

    } else if (this.props.location.state.fetch === "POST") {

      let entryObject = {

        "userName": this.state.userName,
        "password": this.state.password,
        "firstName": this.state.firstName,
        "lastName": this.state.lastName,
        "birthDate": this.state.birthDate,
        "certLevel": this.state.certLevel,
        "certOrg": this.state.certOrg,
        "gender": this.state.gender,
        "city": this.state.city,
        "state": this.state.state,
        "country": this.state.country,
        "zip": Number(this.state.zip),
        "diveInterests": this.state.diveInterests,
        "friends": this.state.friends,
        "userPhoto": this.state.userPhoto

      }
      this.props.registerNewUser(entryObject)
    }
  }

  prepopulateForm() {
    let user = this.props.location.state.user
    user.map(usr =>
      this.setState({userName: usr.userName, password: usr.password, firstName: usr.firstName, lastName: usr.lastName, birthDate: usr.birthDate, certLevel: usr.certLevel, certOrg: usr.certOrg, gender: usr.gender, city: usr.city, state: usr.state, country: usr.country, zip: usr.zip, diveInterests: usr.diveInterests, friends: usr.friends, userPhoto: usr.userPhoto}, () => null)
    )
  }

  componentDidMount () {
    if (this.props.location.state.fetch === "PUT") {
      this.prepopulateForm();
    }
  }

  render () {

    return(
      <section className="form_container">
        <Form className="profile_add_edit_form whole_form" onSubmit={this.handleEntry}>
        <Form.Row className="title_row"><Form.Label className="form_title">ENTER YOUR PROFILE INFORMATION</Form.Label></Form.Row>
        <Form.Row>
          <Form.Group className="form_group" controlId="userName">
            <Form.Label size="sm" className="profile_add_edit_form profile_userName form_label">UserName
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_userName form_input" type="text"name="password" value={this.state.userName} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="password">
            <Form.Label size="sm" className="profile_add_edit_form profile_password form_label">Password
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_password form_input" type="text"name="password" value={this.state.password} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="firstName">
            <Form.Label size="sm" className="profile_add_edit_form profile_first_name form_label">First Name
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_first_name form_input" type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="lastName">
            <Form.Label size="sm" className="profile_add_edit_form profile_last_name form_label">Last Name
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_last_name form_input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="birthDate">
            <Form.Label size="sm" className="profile_add_edit_form profile_birthdate form_label">Birth Date
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_birthdate form_input" type="date" name="birthDate" required={true} value={this.state.birthDate} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="gender">
            <Form.Label size="sm" className="profile_add_edit_form profile_gender form_label">Gender
           <Form.Control as='input' size="sm" className="profile_add_edit_form profile_gender form_input" type="text" name="gender" value={this.state.gender} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="certLevel">
            <Form.Label size="sm" className="profile_add_edit_form profile_cert_level form_label">Certification Level
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_cert_level form_input" type="text" name="certLevel" value={this.state.certLevel} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="certOrg">
            <Form.Label size="sm" className="profile_add_edit_form profile_cert_org form_label">Certifying Organization
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_cert_org form_input" type="text" name="certOrg" value={this.state.certOrg} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="city">
            <Form.Label size="sm" className="profile_add_edit_form profile_city form_label">City
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_city form_input" type="text" name="city" value={this.state.city} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="state">
            <Form.Label size="sm" className="profile_add_edit_form profile_state form_label">State
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_state form_input" type="text" name="state" value={this.state.state} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="zip">
            <Form.Label size="sm" className="profile_add_edit_form profile_zip form_label">Zip
            <Form.Control as='input' size="sm" className="profile_add_edit_form profile_zip form_input" type="text" name="zip" value={this.state.zip} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
            <Form.Group className="form_group" controlId="country">
            <Form.Label size="sm" className="profile_add_edit_form profile_country form_label">Country
          <Form.Control as='input' size="sm" className="profile_add_edit_form profile_country form_input" type="text" name="country" value={this.state.country} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="diveInterests">
            <Form.Label size="sm" className="profile_add_edit_form profile_interests form_label">Dive Interests
            <Form.Control as='textarea' size="sm" className="profile_add_edit_form profile_interests form_textarea" name="diveInterests" value={this.state.diveInterests} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
        </Form.Row>
          <Button as="input" type="submit" size="sm" className="button profile_entry_edit_form submit_button" />
        </Form>
      </section>
    )
  }
}