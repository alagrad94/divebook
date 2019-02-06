import React, { Component } from 'react'
import divebookData from '../../1_modules/divebookData'



export default class ProfileAddEditForm extends Component {

  constructor(props) {

    super(props);
    this.state = {

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
      console.log("PUT", entryObject)
      this.props.editUserProfile(entryObject)

    } else if (this.props.location.state.fetch === "POST") {

      let entryObject = {

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
      console.log("POST", entryObject)
      this.props.registerNewUser(entryObject)

    }
  }

  prepopulateForm() {
    let user = this.props.location.state.user
    user.map(usr =>
      this.setState({password: usr.password, firstName: usr.firstName, lastName: usr.lastName, birthDate: usr.birthDate, certLevel: usr.certLevel, certOrg: usr.certOrg, gender: usr.gender, city: usr.city, state: usr.state, country: usr.country, zip: usr.zip, diveInterests: usr.diveInterests, friends: usr.friends, userPhoto: usr.userPhoto}, () => null)
    )
  }

  componentDidMount () {
    if (this.props.location.state.fetch === "PUT") {
      this.prepopulateForm();
    }
  }

  render () {

    return(
      <React.Fragment>
        <form className="profileAddEditForm" onSubmit={this.handleEntry}>
          <label>Birth Date
          <input type="date" name="birthDate" required={true} value={this.state.birthDate} onChange={this.handleInputChange} /></label><br />
          <label>First Name
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} /></label><br />
          <label>Last Name
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} /></label><br />
          <label>Certification Level
          <input type="text" name="certLevel" value={this.state.certLevel} onChange={this.handleInputChange} /></label><br />
          <label>Certifying Organization
          <input type="text" name="certOrg" value={this.state.certOrg} onChange={this.handleInputChange} /></label><br />
          <label>Gender
          <input type="text" name="gender" value={this.state.gender} onChange={this.handleInputChange} /></label><br />
          <label>City
          <input type="text" name="city" value={this.state.city} onChange={this.handleInputChange} /></label><br />
          <label>State
          <input type="text" name="state" value={this.state.state} onChange={this.handleInputChange} /></label><br />
          <label>Country
          <input type="text" name="country" value={this.state.country} onChange={this.handleInputChange} /></label><br />
          <label>Zip
          <input type="text" name="zip" value={this.state.zip} onChange={this.handleInputChange} /></label><br />
          <label>Dive Interests
          <textarea name="diveInterests" value={this.state.diveInterests} onChange={this.handleInputChange} /></label><br />
          <label>Password
          <input type="text"name="password" value={this.state.password} onChange={this.handleInputChange} /></label><br />
          <input type="submit" />
        </form>;
      </React.Fragment>
    )
  }
}