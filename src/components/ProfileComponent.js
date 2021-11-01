import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import UserService from "../services/UserService";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: '', id: '' },
      content: {},
      error: ''
    };
  }

  //auto invoked
  componentDidMount() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) this.setState({ redirect: "/" }); //redirect to home if no current user

    else {  //collect data for this user
      this.setState({ currentUser: currentUser, userReady: true })
      UserService.getContent(currentUser.id)
        .then(response => {
          this.setState({content: response.data})
        },
          error => {
            this.setState({error: error.message})
          })
    }

  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;
    const { content } = this.state


    return (
      <div>
        <h2><strong>{currentUser.username}</strong> Profile</h2>
        {JSON.stringify(content)}
        <p>
          <span style={{ color: "red" }}>{this.state.error}</span>
        </p>
      </div>
    );
  }
}

export default ProfileComponent