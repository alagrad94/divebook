import React, { Component } from "react"
import divebookData from "../../1_modules/divebookData";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class Register extends Component {

  state = {

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
    userPhoto: ""
  }

  handleInputChange = evt => {
    const stateToChange= {};
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange);
  }

  getAllUsers = evt => {
    evt.preventDefault();
    divebookData.handleData({dataSet: "users", fetchType: "GET", embedItem: `?userName=${this.state.userName}`})
    .then(allUsers => {
      if (allUsers.length > 0) {
        alert("Sorry, this username is taken!")
      } else if (this.state.userName === "" || this.state.password === "") {
        alert("Sorry, username and password cannot be blank!")
      } else {
        alert("You're in!")
        const newUser = {

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
        this.props.registerNewUser(newUser)
      }
    })
  }

  render() {
    return (
      <section className="form_container">
        <div className="registration-text">
          <h3>WELCOME TO DIVEBOOK, PLEASE REGISTER</h3>
        </div>
        <Form className="registration_form whole_form" onSubmit={this.getAllUsers}>
          <Form.Row>
            <Form.Group className="form_group" controlId="userName">
              <Form.Label size="sm" className="registration_form registration_userName form_label" placeholder="Please Enter a User Name">UserName
              <Form.Control as='input' required size="sm" className="registration_form registration_userName form_input" type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} /></Form.Label>
            </Form.Group>
            <Form.Group className="form_group" controlId="password">
              <Form.Label size="sm" className="registration_form registration_password form_label">Password
              <Form.Control as='input' required size="sm" className="registration_form registration_password form_input" type="text" name="password" value={this.state.password} onChange={this.handleInputChange} /></Form.Label>
            </Form.Group>
          </Form.Row>
          <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="firstName">
            <Form.Label size="sm" className="registration_form registration_first_name form_label">First Name
            <Form.Control as='input' required size="sm" className="registration_form registration_first_name form_input" type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="lastName">
            <Form.Label size="sm" className="registration_form registration_last_name form_label">Last Name
            <Form.Control as='input' required size="sm" className="registration_form registration_last_name form_input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="birthDate">
            <Form.Label size="sm" className="registration_form registration_birthdate form_label">Birth Date
            <Form.Control as='input' required size="sm" className="registration_form registration_birthdate form_input" type="date" name="birthDate" value={this.state.birthDate} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="gender">
            <Form.Label size="sm" className="registration_form registration_gender form_label">Gender
           <Form.Control as='input' required size="sm" className="registration_form registration_gender form_input" type="text" name="gender" value={this.state.gender} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="certLevel">
            <Form.Label size="sm" className="registration_form registration_cert_level form_label">Certification Level
            <Form.Control as='input' required size="sm" className="registration_form registration_cert_level form_input" type="text" name="certLevel" value={this.state.certLevel} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="certOrg">
            <Form.Label size="sm" className="registration_form registration_cert_org form_label">Certifying Organization
            <Form.Control as='input' required size="sm" className="registration_form registration_cert_org form_input" type="text" name="certOrg" value={this.state.certOrg} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="city">
            <Form.Label size="sm" className="registration_form registration_city form_label">City
            <Form.Control as='input' required size="sm" className="registration_form registration_city form_input" type="text" name="city" value={this.state.city} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="state">
            <Form.Label size="sm" className="registration_form registration_state form_label">State
            <Form.Control as='input' required size="sm" className="registration_form registration_state form_input" type="text" name="state" value={this.state.state} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
          <Form.Group className="form_group" controlId="zip">
            <Form.Label size="sm" className="registration_form registration_zip form_label">Zip
            <Form.Control as='input' required size="sm" className="registration_form registration_zip form_input" type="text" name="zip" value={this.state.zip} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
            <Form.Group className="form_group" controlId="country">
            <Form.Label size="sm" className="registration_form registration_country form_label">Country
          <Form.Control as='input' required size="sm" className="registration_form registration_country form_input" type="text" name="country" value={this.state.country} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
          <Form.Group className="form_group" controlId="diveInterests">
            <Form.Label size="sm" className="registration_form registration_interests form_label">Dive Interests
            <Form.Control as='textarea' required size="sm" className="registration_form registration_interests form_textarea" name="diveInterests" value={this.state.diveInterests} onChange={this.handleInputChange} /></Form.Label>
          </Form.Group>
        </Form.Row>
        <Form.Row className="form_row">
        </Form.Row>
          <Button as="input" type="submit" size="sm" className="button registration_entry_edit_form submit_button" />
        </Form>
      </section>
    )
  }
}