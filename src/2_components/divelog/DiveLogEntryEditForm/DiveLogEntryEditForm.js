import React, { Component } from 'react'
import divebookData from '../../../1_modules/divebookData'
import '../divelog.css'


export default class DiveLogEntryEditForm extends Component {

  constructor(props) {

    super(props);
    this.state = {

      diveSiteNames: [],
			diveSiteId: 0,
			diveTypeId: 0,
			waterTypeId: 0,
			airMixId: 0,
			precipTypeId: 0,
			diveDate: "",
			diveStartTime: "",
			diveEndTime: "",
			bottomTime: "",
			equipment: "",
			airTemp: 0,
			surfaceTemp: 0,
			bottomTemp: 0,
			diveDepth: 0,
			vis: 0,
			comments: ""
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleEntry = this.handleEntry.bind(this)
    this.buildDiveSiteSelectOptions = this.buildDiveSiteSelectOptions.bind(this)
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
        "userId": userId,
        "id": Number(this.props.match.params.id),
        "diveSiteId": Number(this.state.diveSiteId),
        "diveTypeId": Number(this.state.diveTypeId),
        "waterTypeId": Number(this.state.waterTypeId),
        "airMixId": Number(this.state.airMixId),
        "precipTypeId": Number(this.state.precipTypeId),
        "diveDate": this.state.diveDate,
        "diveStartTime": this.state.diveStartTime,
        "diveEndTime": this.state.diveEndTime,
        "bottomTime": this.state.bottomTime,
        "equipment": this.state.equipment,
        "airTemp": this.state.airTemp,
        "surfaceTemp": this.state.surfaceTemp,
        "bottomTemp": this.state.bottomTemp,
        "diveDepth": this.state.diveDepth,
        "vis": this.state.vis,
        "comments": this.state.comments
      }
      console.log("PUT", entryObject)
      this.props.editLogEntry(entryObject)
      this.props.history.push("/divelog")

    } else if (this.props.location.state.fetch === "POST") {

      let entryObject = {
        "userId": userId,
        "diveSiteId": Number(this.state.diveSiteId),
        "diveTypeId": Number(this.state.diveTypeId),
        "waterTypeId": Number(this.state.waterTypeId),
        "airMixId": Number(this.state.airMixId),
        "precipTypeId": Number(this.state.precipTypeId),
        "diveDate": this.state.diveDate,
        "diveStartTime": this.state.diveStartTime,
        "diveEndTime": this.state.diveEndTime,
        "bottomTime": this.state.bottomTime,
        "equipment": this.state.equipment,
        "airTemp": this.state.airTemp,
        "surfaceTemp": this.state.surfaceTemp,
        "bottomTemp": this.state.bottomTemp,
        "diveDepth": this.state.diveDepth,
        "vis": this.state.vis,
        "comments": this.state.comments
      }
      console.log("POST", entryObject)
      this.props.addLogEntry(entryObject)
      this.props.history.push("/divelog")
    }

  }

  buildDiveSiteSelectOptions () {
    let diveSiteNames = [];
    divebookData.handleData({dataSet: 'diveSites', fetchType: 'GET', embedItem: ""})
    .then(entries => {
      entries.forEach(entry => {
        if (!diveSiteNames.includes({name: entry.name, id: entry.id})) {
          diveSiteNames.push({name: entry.name, id: entry.id})
        }
      });
      this.setState({diveSiteNames : diveSiteNames})
    })
  }

  prepopulateForm() {
    let diveLogInfo = this.props.location.state.diveLog
    diveLogInfo.map(log =>

      this.setState({diveSiteId: log.diveSiteId, diveTypeId: log.diveTypeId, waterTypeId: log.waterTypeId, airMixId: log.airMixId, precipTypeId: log.precipTypeId, diveDate: log.diveDate, diveStartTime: log.diveStartTime, diveEndTime: log.diveEndTime, bottomTime: log.bottomTime, equipment: log.equipment, airTemp: log.airTemp, surfaceTemp: log.surfaceTemp, bottomTemp: log.bottomTemp, diveDepth: log.diveDepth, vis: log.vis, comments: log.comments}, console.log(this.state.diveDate))
    )

  }
  componentDidMount () {
    this.buildDiveSiteSelectOptions();
    if (this.props.location.state.fetch === "PUT") {
      this.prepopulateForm();
    }
  }

  render () {

    return(
      <React.Fragment>
        <form className="diveLogEntryEditForm" onSubmit={this.handleEntry}>
          <label>Dive Date
          <input type="date" name="diveDate" required={true} value={this.state.diveDate} onChange={this.handleInputChange} /></label><br />
          <label>Dive Start Time
          <input type="time" name="diveStartTime" value={this.state.diveStartTime} onChange={this.handleInputChange} /></label><br />
          <label>Dive End Time
          <input type="time" name="diveEndTime" value={this.state.diveEndTime} onChange={this.handleInputChange} /></label><br />
          <label>Bottom Time
          <input name="bottomTime" value={this.state.bottomTime} onChange={this.handleInputChange} /></label><br />
          <label>Select A Dive Site</label>
            <select name="diveSiteId" value={this.state.diveSiteId} onChange={this.handleInputChange}>
              <option key={0} defaultValue=""></option>
              {
                this.state.diveSiteNames.map(diveSite =>(
                  <option key={diveSite.id} value={diveSite.id}>{diveSite.name}</option>
                ))
              }
            </select>
            <button onClick={()=> {this.props.history.push("/divesites/new")}}>Create a New Dive Site</button><br />
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
          <select name="waterTypeId" value={this.state.waterTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Salt</option>
            <option key={2} value={2}>Fresh</option>
            <option key={3} value={3}>Brackish</option>
          </select><br />
          <label>Air Mix</label>
          <select name="airMixId" value={this.state.airMixId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Air</option>
            <option key={2} value={2}>Nitrox</option>
            <option key={3} value={3}>Trimix</option>
            <option key={4} value={4}>Heliox</option>
          </select><br />
          <label>Precipitation</label>
          <select name="precipTypeId" value={this.state.precipTypeId} onChange={this.handleInputChange}>
            <option key={0} defaultValue=""></option>
            <option key={1} value={1}>Sunny</option>
            <option key={2} value={2}>Rain</option>
            <option key={3} value={3}>Sleet</option>
            <option key={4} value={4}>Snow</option>
          </select><br />
          <label>Air Temperature
          <input name="airTemp" value={this.state.airTemp} onChange={this.handleInputChange} /></label><br />
          <label>Surface Temperature
          <input name="surfaceTemp" value={this.state.surfaceTemp} onChange={this.handleInputChange} /></label><br />
          <label>Bottom Temperature
          <input name="bottomTemp" value={this.state.bottomTemp} onChange={this.handleInputChange} /></label><br />
          <label>Visibility
          <input name="vis" value={this.state.vis} onChange={this.handleInputChange} /></label><br />
          <label>Depth
          <input type="text" name="diveDepth" value={this.state.diveDepth} onChange={this.handleInputChange} /></label><br />
          <label>Equipment Used
          <textarea name="equipment" value={this.state.equipment} onChange={this.handleInputChange} /></label><br />
          <label>Comments
          <textarea name="comments" value={this.state.comments} onChange={this.handleInputChange} /></label><br />
          <input type="submit" />
        </form>;
      </React.Fragment>
    )
  }
}