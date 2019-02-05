import React, { Component } from 'react'
import DiveSiteDetails from './DiveSiteDetails'
import divebookData from '../../1_modules/divebookData';
import { Link } from 'react-router-dom'

export default class DiveSites extends Component {

  constructor (props){
    super(props);
    this.state = {

      diveSites: []
    }
  }

  getDiveSites() {
    let diveSites = []
    divebookData.handleData({dataSet: "diveSites", fetchType: "GET", embedItem: ""})
    .then(sites => {
      sites.forEach(site => {
        diveSites.push(site)
      });
      this.setState({diveSites: diveSites})
    })
  }

  componentDidMount() {
    this.getDiveSites();
  }
  render () {
    return(
      <React.Fragment>
      {
      this.state.diveSites.map(site => (
      <DiveSiteDetails key={site.id} diveSite={[site]} {...this.props}/>
        ))
      }
      <Link to={{pathname: "/divesites/new", state: {fetch: "POST"}}}><button>Add New Dive Site</button></Link>
      </React.Fragment>
    )
  }
}