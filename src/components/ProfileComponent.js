import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class ProfileComponent extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        redirect: null,
        userReady: false,
        currentUser: { username: "" }
      };
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'));
    
        if (!currentUser) this.setState({ redirect: "/" });
        this.setState({ currentUser: currentUser, userReady: true })
      }

    render() {
        if (this.state.redirect) {
          return <Redirect to={this.state.redirect} />
        }
        const { currentUser } = this.state;

        return (
            <div>
                <h2><strong>{currentUser.username}</strong> Profile</h2>
            </div>
        );
    }
}

export default ProfileComponent