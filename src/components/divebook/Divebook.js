import React, { Component } from "react"
import NavBar from '../nav/NavBar'
import ApplicationViews from "../applicationViews/ApplicationViews"
import divebookData from '../../modules/divebookData'

export default class Divebook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }


componentDidMount(){

    divebookData.fetchFactory({dataSet: 'users', fetchType: 'GET', embedItem: ""})
        .then(users => {this.setState({users: users})})
        // .then(() => divebookData.fetchFactory({dataSet: 'friends', fetchType: 'GET', embedItem: ""}))
        // .then(friends => {this.setState({friends: friends})})

}

    render() {
        return (
            <React.Fragment>
                <NavBar state={this.state}/>
                <ApplicationViews state={this.state}/>
            </React.Fragment>
        )
    }
}