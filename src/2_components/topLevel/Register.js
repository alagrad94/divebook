import React, { Component } from "react"
import divebookData from "../../1_modules/divebookData";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class Register extends Component {

  state = {
    userName: "",
    password: ""
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
          "firstName": "",
          "lastName": "",
          "birthDate": "",
          "certLevel": "",
          "certOrg": "",
          "gender": "",
          "city": "",
          "state": "",
          "country": "",
          "zip": 0,
          "diveInterests": "",
          "friends": "",
          "userPhoto": ""
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
        <Form className="profile_add_edit_form whole_form" onSubmit={this.getAllUsers}>
          <Form.Row>
            <Form.Group className="form_group" controlId="userName">
              <Form.Label size="sm" className="registration_form registration_userName form_label" placeholder="Please Enter a User Name">UserName
              <Form.Control as='input' size="sm" className="registration_form registration_userName form_input" type="text"name="userName" value={this.state.userName} onChange={this.handleInputChange} /></Form.Label>
            </Form.Group>
            <Form.Group className="form_group" controlId="password">
              <Form.Label size="sm" className="registration_form registration_password form_label">Password
              <Form.Control as='input' size="sm" className="registration_form registration_password form_input" type="text"name="password" value={this.state.password} onChange={this.handleInputChange} /></Form.Label>
            </Form.Group>
          </Form.Row>
            <Button as="input" type="submit" className="button regsistration_form submit_button"  ></Button>
        </Form>
      </section>
    )
  }
}