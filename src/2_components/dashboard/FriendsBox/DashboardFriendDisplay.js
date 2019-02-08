import React, { Component } from 'react'
import PlaceholderImage from '../../../Placeholder.png'

export default class DahsboardFriendDisplay extends Component {

  render () {

    return(
      <section >
        <div key={this.props.buddy.id} className="db-friends friend">
        <div className="db_friends friend_name">{this.props.buddy.firstName} {this.props.buddy.lastName}</div>
        <img src={PlaceholderImage} alt="" className="db_friends friend_photo"></img>
        </div>
      </section>
    )
  }
}