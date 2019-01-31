import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Dashboard from '../dashboard/Dashboard'


export default class ApplicationViews extends Component {

    constructor() {
        super();
        this.state = {


            }

    }


    componentDidMount() {


    }

    render() {
        return (
            <React.Fragment>
                <Route path="/" render={(props) => {
                    return <Dashboard {...props} state={this.props.state} />}} />
            </React.Fragment>
        )
    }
}