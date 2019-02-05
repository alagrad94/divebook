import React, { Component } from 'react'
import FriendsListBox from './FriendsListBox/FriendsListBox'
import FriendsProfileBox from './FriendsProfileBox/FriendsProfileBox'

export default class Friends extends Component {

  render () {
    return(
      <section className="dahsboard">
      <FriendsListBox  {...this.props} />
      <FriendsProfileBox {...this.props} />
      </section>
    )
  }
}