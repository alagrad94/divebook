import React, { Component } from 'react'

export default class DahsboardFriendDisplay extends Component {

  render () {

    return(
      <section >
        {
          this.props.data.friends.filter(friend => friend.id === this.props.friend).map(friend =>
              <div key={friend.id} className="db-friends friend">
              <p className="db_friends friend_name">{'Name:'} {friend.firstName} {friend.lastName}</p>
              <div className="db_friends friend_photo">{friend.userPhoto}</div>
              </div>
            )
        }
      </section>
    )
  }
}