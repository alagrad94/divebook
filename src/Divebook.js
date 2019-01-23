import React, { Component } from "react"
import NavBar from './components/nav/NavBar'
import ApplicationViews from "./ApplicationViews"


export default class Divebook extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}