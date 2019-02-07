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
        <form className="profile_add_edit_form" onSubmit={this.handleEntry}>
          <label className="profile_add_edit_form profile_birthdate form_label">Birth Date
          <input className="profile_add_edit_form profile_birthdate form_input" type="date" name="birthDate" required={true} value={this.state.birthDate} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_first_name form_label">First Name
          <input className="profile_add_edit_form profile_first_name form_input" ype="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_last_name form_label">Last Name
          <input className="profile_add_edit_form profile_last_name form_input" type="text" name="lastName" value={this.state.lastName} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_cert_level form_label">Certification Level
          <input className="profile_add_edit_form profile_cert_level form_input" type="text" name="certLevel" value={this.state.certLevel} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_cert_org form_label">Certifying Organization
          <input className="profile_add_edit_form profile_cert_org form_input" type="text" name="certOrg" value={this.state.certOrg} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_gender form_label">Gender
          <input className="profile_add_edit_form profile_gender form_input" type="text" name="gender" value={this.state.gender} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_city form_label">City
          <input className="profile_add_edit_form profile_city form_input" type="text" name="city" value={this.state.city} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_state form_label">State
          <input className="profile_add_edit_form profile_state form_input" type="text" name="state" value={this.state.state} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_country form_label">Country
          <input className="profile_add_edit_form profile_country form_input" type="text" name="country" value={this.state.country} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_zip form_label">Zip
          <input className="profile_add_edit_form profile_zip form_input" type="text" name="zip" value={this.state.zip} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_interests form_label">Dive Interests
          <textarea className="profile_add_edit_form profile_interests form_textarea" name="diveInterests" value={this.state.diveInterests} onChange={this.handleInputChange} /></label><br />
          <label className="profile_add_edit_form profile_password form_label">Password
          <input className="profile_add_edit_form profile_password form_input" type="text"name="password" value={this.state.password} onChange={this.handleInputChange} /></label><br />
          <input className="button profile_entry_edit_form submit_profile_button" type="submit" />
        </form>;
      </React.Fragment>
    )
  }
}