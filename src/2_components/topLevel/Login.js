import React, { Component } from "react"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class Login extends Component {

  state = {
    userName: "",
    password: ""
  }

  handleInputChange = evt => {
    const stateToChange= {};
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange);
  };

  onLogin = (evt) => {
    evt.preventDefault();
    this.props.checkLogin(this.state.userName, this.state.password)
    .then(allUsers => {
      if(allUsers.length < 1) {
        alert("We can't seem to find you! Try registering below")
      } else {
        allUsers.forEach(user => {
        sessionStorage.setItem("user", user.id);
        this.props.populateAppState()
        this.props.history.push("/home")});
      }
    })
  }

  componentDidMount () {
    if (sessionStorage.getItem("user") !== null) {
      sessionStorage.removeItem("user")
    }
  }

  render() {
    return (
      <section className="form_container">
        <div className="registration-text">
          <h3 className="whole_form">Welcome to DiveBook!  Please log in. </h3>
        </div>
        <Form className="profile_add_edit_form whole_form" onSubmit={this.onLogin}>
          <Form.Row>
            <Form.Group className="form_group" controlId="userName">
              <Form.Label size="sm" className="registration_form registration_userName form_label" placeholder="Please Enter a User Name">UserName
              <Form.Control as='input' required size="sm" className="registration_form registration_userName form_input" type="text"name="userName" placeholder="User Name" value={this.state.userName} onChange={this.handleInputChange} /></Form.Label>
            </Form.Group>
            <Form.Group className="form_group" controlId="password">
              <Form.Label size="sm" className="registration_form registration_password form_label">Password
              <Form.Control as='input' required size="sm" className="registration_form registration_password form_input" type="text"name="password"placeholder="Password" value={this.state.password} onChange={this.handleInputChange} /></Form.Label>
            </Form.Group>
          </Form.Row>
            <Button as="input" type="submit" className="button regsistration_form submit_button"  ></Button>
            <p className="not-a-user">Not a User? <Link className="not-a-user" to={"/register"}>Register Here</Link></p>
        </Form>
      </section>
      )
    }
}