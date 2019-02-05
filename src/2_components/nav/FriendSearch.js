import React, { Component } from 'react'

export default class FriendsSearch extends Component {

    render() {
        return (
            <div>
                <form>
                <input
                    placeholder="Find New Friends"
                    ref={input => this.search = input}
                    onChange={this.props.handleFriendSearchInput}
                />
                </form>
            </div>
        )
    }
}