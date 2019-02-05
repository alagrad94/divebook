import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'

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
      this.props.history.push("/divesites")

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
      this.props.history.push("/divesites")
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
      <React.Fragment>
        <form className="diveLogEntryEditForm" onSubmit={this.handleEntry}>
          <label>Name</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange}></input><br />
          <label>City</label>
          <input type="text" name="city" value={this.state.city} onChange={this.handleInputChange}></input><br />
          <label>State</label>
          <input type="text" name="state" value={this.state.state} onChange={this.handleInputChange}></input><br />
          <label>Zip Code</label>
          <input name="zip" type="text" value={this.state.zip} onChange={this.handleInputChange}></input><br />
          <label>Things to do on shore nearby</label>
          <textarea name="landAttractions" value={this.state.landAttractions} onChange={this.handleInputChange}></textarea><br />
          <label>Things to see underwater</label>
          <textarea name="underwaterAttractions" value={this.state.underwaterAttractions} onChange={this.handleInputChange}></textarea><br />
          <label>Depth</label>
          <input name="waterDepth" value={this.state.waterDepth} onChange={this.handleInputChange}></input><br />
          <label>Dive Type</label>
          <select name="diveTypeId" value={this.state.diveTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Open Water - Ocean</option>
            <option key={2} value={2}>Open Water - Lake</option>
            <option key={3} value={3}>Open Water - Quarry</option>
            <option key={4} value={4}>Open Water - Other</option>
            <option key={5} value={5}>River</option>
            <option key={6} value={6}>Wreck</option>
            <option key={7} value={7}>Cave</option>
          </select><br />
          <label>Water Type</label>
          <select name="waterTypeId"  value={this.state.waterTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Salt</option>
            <option key={2} value={2}>Fresh</option>
            <option key={3} value={3}>Brackish</option>
          </select><br />
          <input type="submit" />
        </form>;
      </React.Fragment>
    )
  }
}