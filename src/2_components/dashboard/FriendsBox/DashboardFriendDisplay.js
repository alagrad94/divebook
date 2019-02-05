import React, { Component } from 'react'

export default class DahsboardFriendDisplay extends Component {

  render () {

    return(
      <section>
        {
          this.props.data.friends.filter(friend => friend.id === this.props.friend).map(friend =>
              <div key={friend.id}>
              <h1>{friend.firstName}{friend.lastName}</h1>
              </div>
            )
        }
      </section>
    )
  }
}