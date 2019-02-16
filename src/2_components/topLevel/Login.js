import React, { Component } from "react"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Box, Grid} from 'grommet'

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
       <Grid className="login_grid"
				areas ={[
					{name: 'logo', start: [0,0], end: [1,1]},
					{name: 'form', start: [1,0], end: [1,1]}
				]}
				columns={['30%', '70%']}
				rows={['xlarge', "1px"]}
				gap='none'
			>
				<Box gridArea='logo' background='#861214' className="login_grid_left">
          <h2 className="login_grid_logo">Divebook</h2>
				</Box>

				<Box gridArea='form' background='none' className="login_grid_right">
          <Form className="login_form_whole whole_form" onSubmit={this.onLogin}>
            <Form.Row>
              <Form.Group className="form_group" controlId="userName">
                <Form.Label size="sm" className="login_form login_userName form_label" placeholder="Please Enter a User Name">UserName
                <Form.Control as='input' required size="sm" className="login_form login_userName_input form_input" type="text"name="userName" placeholder="User Name" value={this.state.userName} onChange={this.handleInputChange} /></Form.Label>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className="form_group" controlId="password">
                <Form.Label size="sm" className="login_form login_password form_label">Password
                <Form.Control as='input' required size="sm" className="login_form login_password_input form_input" type="text"name="password"placeholder="Password" value={this.state.password} onChange={this.handleInputChange} /></Form.Label>
              </Form.Group>
            </Form.Row>
              <Button as="input" type="submit" className="button login_form submit_button"  ></Button>
              <p className="not-a-user">Not a User? <Link className="not-a-user" to={"/register"}>Register Here</Link></p>
          </Form>
				</Box>
			</Grid>
      )
    }
}